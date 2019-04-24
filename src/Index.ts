import { NextFunction, Request, Response, Router } from 'express';
import sequelize = require('sequelize');
import { ISequelizeRestApiOptions, ISequelizeRestApiExpressRequest } from './types/Types';
import { createMiddleware, deleteMiddleware, getAllMiddleware, getByIdMiddleware, updateMiddleware } from './middleware/DataAccess';
import { sendSuccessfulResponse } from './middleware/SendResponse';

const passThroughMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next();
};

export const create = <I, M>(
    router: Router,
    sequelizeModel: sequelize.Model<I, M>,
    entityName: string,
    options: ISequelizeRestApiOptions<I, M>): void => {

    // Get by ID
    router.get(`/api/${entityName}/:id`,
        (req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction) => {
            req.sequelizeRestApiInfo = {
                entityId: (req.params as any).id,
                entityName,
                sequelizeModel,
            };
            next();
        },
        options.preRetrieve || passThroughMiddleware,
        getByIdMiddleware,
        options.postRetrieve || passThroughMiddleware,
        sendSuccessfulResponse,
    );

    // Get All
    router.get(`/api/${entityName}`,
        (req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction) => {
            req.sequelizeRestApiInfo = {
                entityName,
                sequelizeModel,
            };
            next();
        },
        options.preRetrieve || passThroughMiddleware,
        getAllMiddleware,
        options.postRetrieve || passThroughMiddleware,
        sendSuccessfulResponse,
    );

    // Update by ID
    router.post(`/api/${entityName}/:id`,
        (req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void => {
            req.sequelizeRestApiInfo = {
                entityId: (req.params as any).id,
                entityName,
                entityToInsertOrUpdate: req.body as M,
                sequelizeModel,
            };
            next();
        },
        options.preEdit || passThroughMiddleware,
        options.preUpdate || passThroughMiddleware,
        updateMiddleware,
        options.postUpdate || passThroughMiddleware,
        sendSuccessfulResponse,
    );

    // Create New
    router.post(`/api/${entityName}`,
        (req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void => {
            req.sequelizeRestApiInfo = {
                entityName,
                entityToInsertOrUpdate: req.body as M,
                sequelizeModel,
            };
            next();
        },
        options.preEdit || passThroughMiddleware,
        options.preInsert || passThroughMiddleware,
        createMiddleware,
        options.postInsert || passThroughMiddleware,
        sendSuccessfulResponse,
    );

    // Delete
    router.delete(`/api/${entityName}/:id`,
        (req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void => {
            req.sequelizeRestApiInfo = {
                entityId: (req.params as any).id,
                entityName,
                sequelizeModel,
            };
            next();
        },
        options.preEdit || passThroughMiddleware,
        options.preDelete || passThroughMiddleware,
        deleteMiddleware,
        options.postDelete || passThroughMiddleware,
        sendSuccessfulResponse,
    );
};
