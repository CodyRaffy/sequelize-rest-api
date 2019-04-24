import { ISequelizeRestApiExpressRequest } from "./../types/Types";
import { Response } from "express";

export const sendSuccessfulResponse = function <I, M>(req: ISequelizeRestApiExpressRequest<I, M>, res: Response): void {
    const response = req.sequelizeRestApiInfo.result || req.sequelizeRestApiInfo.results || true;
    res.status(req.sequelizeRestApiInfo.successStatusCode!).json(response);
}