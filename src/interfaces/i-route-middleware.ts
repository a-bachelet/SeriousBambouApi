/**
 * Dependencies Imports
 */
import { NextFunction, Request, Response } from 'express';
import { ValidationChain } from 'express-validator/check';

/**
 * IRouteMiddleware Interface Definition
 * @param req (Request) Incoming express request
 * @param res (Response) Outgoing express response
 * @param next (NextFunction) Function called after this middleware execution
 */
export type IRouteMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => void | ValidationChain;
