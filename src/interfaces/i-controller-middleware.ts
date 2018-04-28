/**
 * Dependencies Imports
 */
import { NextFunction, Request, Response } from 'express';

/**
 * IControllerMiddleware Interface Definition
 * @param req (Request) Incoming express request
 * @param res (Response) Outgoing express response
 * @param next (NextFunction) Function called after this middleware execution
 */
export type IControllerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;
