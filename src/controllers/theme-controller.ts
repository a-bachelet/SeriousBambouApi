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
import { Theme, ThemeModel } from '../models/theme';

/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';

/**
 * ThemeController Class Definition
 */
export class ThemeController extends AbstractController {

    protected routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getThemes, middlewares: [] },
        { method: 'GET', path: '/:id', callable: this.getTheme, middlewares: [] }
    ]; // Controller routes

    /**
     * Returns all themes found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getThemes(req: Request, res: Response): void {
        Theme.find({}, (err: MongoError, themes: ThemeModel[]) => {
            res.send(themes);
        });
    }

    /**
     * Returns one theme found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getTheme(req: Request, res: Response): void {
        const id: number = req.params.id;
        Theme.findOne({ _id: id }, (err: MongoError, theme: ThemeModel) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error.' });
            } else {
                if (!theme) {
                    res.status(404).send({ message: 'Theme not found.' });
                } else {
                    res.send(theme);
                }
            }
        });
    }

}
