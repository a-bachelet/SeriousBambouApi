/**
 * Interfaces Imports
 */
import { IControllerMiddleware } from '../interfaces/i-controller-middleware';
import { IRoute } from '../interfaces/i-route';

/**
 * AbstractController Abstract Class Definition
 */
export abstract class AbstractController {

    protected routes: IRoute[] = []; // Controller routes
    protected middlewares: IControllerMiddleware[] = []; // Controller middlewares

    private path: string; // Controller path

    /**
     * Sets the controller path
     * @param path (string) Controller path
     */
    constructor(path: string) {
        this.path = path;
    }

    /**
     * Returns the controller middlewares
     */
    public getMiddlewares(): IControllerMiddleware[] {
        return this.middlewares;
    }

    /**
     * Returns the controller path
     */
    public getPath(): string {
        return this.path;
    }

    /**
     * Returns the controller routes
     */
    public getRoutes(): IRoute[] {
        return this.routes;
    }

}
