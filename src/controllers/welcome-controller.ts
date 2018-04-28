/**
 * Dependencies Imports
 */
import { Request, Response } from 'express';

/**
 * Interfaces Imports
 */
import { ICallable } from '../interfaces/i-callable';
import { IRoute } from '../interfaces/i-route';

/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';

/**
 * WelcomeController Class Definition
 */
export class WelcomeController extends AbstractController {

    protected routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getWelcomingMessage, middlewares: [] }
    ]; // Controller routes

    /**
     * Returns a welcoming message
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getWelcomingMessage(req: Request, res: Response): void {
        res.status(200).send({ message: 'Welcome on Node Server Monitor Rest API !' });
    }

}
