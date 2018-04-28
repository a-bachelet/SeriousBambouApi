/**
 * Dependencies Imports
 */
import { NextFunction, Request, Response } from 'express';

/**
 * ICallable Interface Definition
 * @param req (Request) Incoming express request
 * @param res (Response) Outgoing express response
 * @param next (NextFunction) Function called after this middleware execution
 */
export type ICallable  = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;
