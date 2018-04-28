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
import { Quizz, QuizzModel } from '../models/quizz';

/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';

/**
 * QuizzController Class Definition
 */
export class QuizzController extends AbstractController {

    protected routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getQuizzs, middlewares: [] },
        { method: 'GET', path: '/:id', callable: this.getQuizz, middlewares: [] },
        { method: 'GET', path: '/:id/questions', callable: this.getQuizzQuestions, middlewares: [] }
    ]; // Controller routes

    /**
     * Returns all quizzs found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getQuizzs(req: Request, res: Response): void {
        Quizz.find({}, (err: MongoError, quizzs: QuizzModel[]) => {
            res.send(quizzs);
        });
    }

    /**
     * Returns one quizz found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getQuizz(req: Request, res: Response): void {
        const id: number = req.params.id;
        Quizz.findOne({ _id: id }, (err: MongoError, quizz: QuizzModel) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error.' });
            } else {
                if (!quizz) {
                    res.status(404).send({ message: 'Quizz not found.' });
                } else {
                    res.send(quizz);
                }
            }
        });
    }

    /**
     * Returns one quizz found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getQuizzQuestions(req: Request, res: Response): void {
        const id: number = req.params.id;
        Question.find({ quizz : id}, (err: MongoError, questions: QuestionModel) => {
            res.send(questions);
        });
    }

}
