/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';
import { AbstractRouter } from '../abstract/abstract-router';

/**
 * Controllers Imports
 */
import { AuthController } from '../controllers/auth-controller';
import { QuestionController } from '../controllers/question-controller';
import { QuizzController } from '../controllers/quizz-controller';
import { ThemeController } from '../controllers/theme-controller';
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
            new AuthController('/auth'),
            new QuestionController('/questions'),
            new QuizzController('/quizzs'),
            new ThemeController('/themes'),
            new UserController('/users'),
            new WelcomeController('/welcome')
        ];
    }

}
