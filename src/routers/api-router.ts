/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';
import { AbstractRouter } from '../abstract/abstract-router';

/**
 * Controllers Imports
 */
import { UserController } from '../controllers/user-controller';
import { WelcomeController } from '../controllers/welcome-controller';

/**
 * ApiRouter Class Definition
 */
export class ApiRouter extends AbstractRouter {

    /**
     * Returns an array which contains controllers
     */
    protected getControllers(): AbstractController[] {
        return [
            new UserController('/users'),
            new WelcomeController('/welcome')
        ];
    }

}
