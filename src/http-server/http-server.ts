/**
 * Abstract Classes Imports
 */
import { AbstractRouter } from '../abstract/abstract-router';

/**
 * Dependencies Imports
 */
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as expressValidator from 'express-validator';
import * as helmet from 'helmet';

/**
 * Routers Imports
 */
import { ApiRouter } from '../routers//api-router';

/**
 * HttpServer Class Definition
 */
export class HttpServer {

    private expressApp: express.Application; // Express application instance
    private expressPort: number; // Express application listening port
    private routers: AbstractRouter[] = [
        new ApiRouter('/api')
    ]; // HttpServer routers

    /**
     * Instantiates the express application
     * Defines the express application listening port
     * Loads middlewares in the express application
     * Loads express routers in the express application
     */
    constructor() {
        this.expressApp = express();
        this.expressPort = Number(process.env.EXPRESS_PORT) || 3000;
        this.initMiddlewares();
        this.initRouters();
    }

    /**
     * Starts the express application
     * @param callback (Function) Function called after the express application starts
     */
    public start(callback: (port: number) => void): void {
        this.expressApp.listen(this.expressPort, () => { callback(this.expressPort); });
    }

    /**
     * Loads middlewares in the express application
     */
    private initMiddlewares(): void {
        this.expressApp.use(urlencoded({ extended: false }));
        this.expressApp.use(json());
        this.expressApp.use(cookieParser());
        this.expressApp.use(expressValidator());
        this.expressApp.use(helmet());
    }

    /**
     * Loads express routers in the express application
     */
    private initRouters(): void {
        this.routers.forEach((router: AbstractRouter) => {
            this.expressApp.use(router.getPath(), router.getRouter());
        });
    }

}
