import { NextFunction, Response, Request } from "express"
import sequelize = require("sequelize");

export interface ISequelizeRestApiExpressRequest<I, M> extends Request {
    sequelizeRestApiInfo: ISequelizeRestApiInfo<I, M>
}

export interface ISequelizeRestApiInfo<I, M> {
    sequelizeModel: sequelize.Model<I, M>;
    entityName: string;
    entityToInsertOrUpdate?: M;
    entityId?: string;
    result?: I;
    results?: I[];
    successStatusCode?: number;
}

export type SequelizeRestApiMiddleware<I, M> = (req: ISequelizeRestApiExpressRequest<I, M>, res: Response, next: NextFunction) => void;

export interface ISequelizeRestApiOptions<I, M> {
    preUpdate?: Array<SequelizeRestApiMiddleware<I, M>>;
    preDelete?: Array<SequelizeRestApiMiddleware<I, M>>;
    preInsert?: Array<SequelizeRestApiMiddleware<I, M>>;

    /// Called before preUpdate, preDelete, and preInsert
    preEdit?: Array<SequelizeRestApiMiddleware<I, M>>;

    preRetrieve?: Array<SequelizeRestApiMiddleware<I, M>>;

    postUpdate?: Array<SequelizeRestApiMiddleware<I, M>>;
    postDelete?: Array<SequelizeRestApiMiddleware<I, M>>;
    postInsert?: Array<SequelizeRestApiMiddleware<I, M>>;
    postRetrieve?: Array<SequelizeRestApiMiddleware<I, M>>;
}
