import { ISequelizeRestApiExpressRequest } from "./../types/Types";
import { NextFunction, Response } from "express";
import * as dataAccessService from "./../services/DataAccessService"

export const getByIdMiddleware = function <I, M>(req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void {

    dataAccessService.getById(req.sequelizeRestApiInfo.entityId!, req.sequelizeRestApiInfo.sequelizeModel).then(
        (entityInstance: I) => {
            req.sequelizeRestApiInfo.successStatusCode = 200;
            req.sequelizeRestApiInfo.result = entityInstance;
            next();
        },
        (error: any) => {
            console.log(error);
            res.status(500).json(`Could not retrieve ${req.sequelizeRestApiInfo.entityName} with ID: ${req.sequelizeRestApiInfo.entityId}`)
        }
    );
}

export const getAllMiddleware = function <I, M>(req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void {

    dataAccessService.getAll(req.sequelizeRestApiInfo.sequelizeModel).then(
        (entityInstances: I[]) => {
            req.sequelizeRestApiInfo.successStatusCode = 200;
            req.sequelizeRestApiInfo.results = entityInstances;
            next();
        },
        (error: any) => {
            console.log(error);
            res.status(500).json(`Could not retrieve all ${req.sequelizeRestApiInfo.entityName} entities`);
        }
    );
}

export const updateMiddleware = function <I, M>(req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void {
    dataAccessService.updateById(req.sequelizeRestApiInfo.entityId!, req.sequelizeRestApiInfo.sequelizeModel, req.sequelizeRestApiInfo.entityToInsertOrUpdate).then(
        (entityInstance: I) => {
            req.sequelizeRestApiInfo.successStatusCode = 200;
            req.sequelizeRestApiInfo.result = entityInstance;
            next();
        },
        (error: any) => {
            console.log(error);
            res.status(500).json({ err: `Could not update ${req.sequelizeRestApiInfo.entityName} with ID: ${req.sequelizeRestApiInfo.entityId}` });
        }
    );
}

export const createMiddleware = function <I, M>(req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void {
    dataAccessService.createNew(req.sequelizeRestApiInfo.sequelizeModel, req.sequelizeRestApiInfo.entityToInsertOrUpdate).then(
        (entityInstance: I) => {
            req.sequelizeRestApiInfo.successStatusCode = 201;
            req.sequelizeRestApiInfo.result = entityInstance;
            next();
        },
        (error: any) => {
            console.log(error);
            res.status(500).json({ err: `Could not create new ${req.sequelizeRestApiInfo.entityName}` });
        }
    );
}

export const deleteMiddleware = function <I, M>(req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction): void {
    dataAccessService.deleteEntity(req.sequelizeRestApiInfo.entityId!, req.sequelizeRestApiInfo.sequelizeModel).then(
        () => {
            req.sequelizeRestApiInfo.successStatusCode = 204;
            next();
        },
        (error: any) => {
            console.log(error);
            res.status(500).json({ err: `Could not delete ${req.sequelizeRestApiInfo.entityName} with ID: ${req.sequelizeRestApiInfo.entityId}` });
        }
    );
}