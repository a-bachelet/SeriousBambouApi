/**
 * Interfaces Imports
 */
import { ICallable } from './i-callable';
import { IRouteMiddleware } from './i-route-middleware';

/**
 * IRoute Interface Definition
 */
export interface IRoute {

    method: string; // Method ('GET' | 'POST' | 'DELETE')
    path: string; // Path (eg: '/', '/:id')
    callable: ICallable; // Function to execute when route is called
    middlewares: IRouteMiddleware[]; // Functions to execute before callable

}
