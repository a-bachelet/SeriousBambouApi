/**
 * Dependencies Imports
 */
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

/**
 * Interfaces Imports
 */
import { ICallable } from '../interfaces/i-callable';
import { IRoute } from '../interfaces/i-route';

/**
 * Models Imports
 */
import { Question, QuestionModel } from '../models/question';

/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';
import { AuthMiddleware } from '../middlewares/auth-middleware';

/**
 * QuestionController Class Definition
 */
export class QuestionController extends AbstractController {

    protected routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getQuestions, middlewares: [AuthMiddleware] },
        { method: 'GET', path: '/:id', callable: this.getQuestion, middlewares: [AuthMiddleware] }
    ]; // Controller routes

    /**
     * Returns all questions found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getQuestions(req: Request, res: Response): void {
        Question.find({}, (err: MongoError, questions: QuestionModel[]) => {
            res.send(questions);
        });
    }

    /**
     * Returns one question found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getQuestion(req: Request, res: Response): void {
        const id: number = req.params.id;
        Question.findOne({ _id: id }, (err: MongoError, question: QuestionModel) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error.' });
            } else {
                if (!question) {
                    res.status(404).send({ message: 'Question not found.' });
                } else {
                    res.send(question);
                }
            }
        });
    }

}
