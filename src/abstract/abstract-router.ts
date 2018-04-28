/**
 * Dependencies Imports
 */
import { Router } from 'express';

/**
 * Interfaces Imports
 */
import { ICallable } from '../interfaces/i-callable';
import { IControllerMiddleware } from '../interfaces/i-controller-middleware';
import { IRoute } from '../interfaces/i-route';

/**
 * Abstract Classes Imports
 */
import { AbstractController } from './abstract-controller';

/**
 * AbstractRouter Abstract Class Definition
 */
export abstract class AbstractRouter {

    private expressRouter: Router; // Express router instance
    private path: string; // Router path

    /**
     * Isntantiates the express router
     * Defines the express router path
     * Loads controllers routes in the express router
     * @param path (string) Router path
     */
    constructor(path: string) {
        this.expressRouter = Router();
        this.path = path;
        this.initControllers();
    }

    /**
     * Returns the router path
     */
    public getPath(): string {
        return this.path;
    }

    /**
     * Returns the express router instance
     */
    public getRouter(): Router {
        return this.expressRouter;
    }

    /**
     * Returns an array which contains controllers
     */
    protected getControllers(): AbstractController[] {
        return [];
    }

    /**
     * Loads controllers routes in the express router
     */
    private initControllers(): void {
        this.getControllers().forEach((controller: AbstractController) => {
            controller.getRoutes().forEach((route: IRoute) => {
                const method: string = route.method.toUpperCase();
                const path: string = controller.getPath() + route.path;
                const callable: ICallable = route.callable;
                const middlewares: IControllerMiddleware[] = route.middlewares;

                switch (method) {
                    case 'GET':
                        this.expressRouter.get(path, [...controller.getMiddlewares(), ...middlewares, callable]);
                        break;
                    case 'POST':
                        this.expressRouter.post(path, [...controller.getMiddlewares(), ...middlewares, callable]);
                        break;
                    case 'DELETE':
                        this.expressRouter.delete(path, [...controller.getMiddlewares(), ...middlewares, callable]);
                        break;
                }
            });
        });
    }

}
