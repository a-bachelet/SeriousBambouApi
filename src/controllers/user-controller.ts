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
import { Level, LevelModel } from '../models/level';
import { User, UserModel } from '../models/user';

/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';

/**
 * UserController Class Definition
 */
export class UserController extends AbstractController {

    protected routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getUsers, middlewares: [] },
        { method: 'GET', path: '/:id', callable: this.getUser, middlewares: [] },
        { method: 'GET', path: '/:id/level', callable: this.getLevel, middlewares: [] }
    ]; // Controller routes

    /**
     * Returns all users found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getUsers(req: Request, res: Response): void {
        User.find({}, (err: MongoError, users: UserModel[]) => {
            res.send(users);
        });
    }

    /**
     * Returns one user found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getUser(req: Request, res: Response): void {
        const id: number = req.params.id;
        User.findOne({ _id: id }, (err: MongoError, user: UserModel) => {
            res.send(user);
        });
    }

    /**
     * Returns the level of a user
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getLevel(req: Request, res: Response): void {
        const id: string = req.params.id;
        User.findOne({ _id: id }, (err: MongoError, user: UserModel) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error.' });
            } else {
                if (!user) {
                    res.status(404).send({ message: 'User not found.' });
                } else {
                    Level.find({}, (lvlErr: MongoError, levels: LevelModel[]) => {
                        levels.forEach((level: LevelModel) => {
                            let storedLevel: LevelModel | null = null;
                            if (user.exp > level.reqExp) {
                                storedLevel = level;
                            } else {
                                res.send(storedLevel ? storedLevel : level);
                            }
                        });
                    });
                }
            }
        });
    }

}
