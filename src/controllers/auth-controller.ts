/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';

/**
 * Dependencies Imports
 */
import { compare } from 'bcrypt-nodejs';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { sign } from 'jsonwebtoken';
import { MongoError } from 'mongodb';

/**
 * Forms Imports
 */
import { LoginForm } from '../forms/login-form';

/**
 * Interfaces Imports
 */
import { ICallable } from '../interfaces/i-callable';
import { IRoute } from '../interfaces/i-route';

/**
 * Middlewares Imports
 */
import { AuthMiddleware } from '../middlewares/auth-middleware';

/**
 * Models Imports
 */
import { User, UserModel } from '../models/user';

/**
 * AuthController Class Definition
 */
export class AuthController extends AbstractController {
    protected routes: IRoute[] = [
        { method: 'POST', path: '/login', callable: this.postLogin, middlewares: [...LoginForm] },
        { method: 'GET', path: '/logout', callable: this.getLogout, middlewares: [AuthMiddleware] }
    ]; // Controller routes

   /**
    * Logs user in the application by provided credentials
    * Returns a new auth token
    * @param req (Request) Incoming express request
    * @param res (Response) Outgoing express response
    */
    private postLogin(req: Request, res: Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: 'Validation failed !', errors: errors.mapped() });
        } else {
            const data: any = matchedData(req);
            User.findOne(
                { username: data.username },
                (err: MongoError, user: UserModel) => {
                    if (err) {
                        res.status(500).send({ message: 'Internal server error.' });
                    } else {
                        if (!user) {
                            res.status(401).send({ message: 'Invalid credentials.' });
                        } else {
                            compare(data.password, user.password, (errCompare: Error, resCompare: boolean) => {
                                if (errCompare) {
                                    res.status(500).send({ message: 'Internal server error.' });
                                } else {
                                    if (!resCompare) {
                                        res.status(401).send({ message: 'Invalid credentials.' });
                                    } else {
                                        delete (data['username']);
                                        delete (data['password']);
                                        user.authToken = ''; // delete(user.authToken doesn't work)
                                        user.password = ''; // delete(user.password doesn't work)
                                        data['authToken'] = sign({
                                            user
                                        }, process.env.JWT_SECRET || 'SERIOUSBAMBOU');
                                        data['validUntil'] = new Date((new Date()).setTime((new Date()).getTime() + 3600000));
                                        User.findByIdAndUpdate(
                                            user._id,
                                            data,
                                            { new: true }
                                        ).populate(['role']).exec((updatedErr: MongoError, updatedUser: (UserModel | null)) => {
                                            if (updatedErr || !updatedUser) {
                                                res.status(500).send({ message: 'Internal server error.' });
                                            } else {
                                                res.status(200).send(updatedUser);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            );
        }
    }
   /**
    * Logs a user off the application by provided auth token
    * @param req (Request) Incoming express request
    * @param res (Response) Outgoing express response
    */
    private getLogout(req: Request, res: Response): void {
        if (req['auth-user']) {
            const data: any = {};
            data['authToken'] = null;
            data['validUntil'] = null;
            User.findByIdAndUpdate(
                req['auth-user']['_id'],
                data,
                (err: MongoError, user: UserModel | null) => {
                    if (err) {
                        res.status(500).send({ message: 'Internal server error.' });
                    } else {
                        res.status(204).send();
                    }
                }
            );
        } else {
            res.status(500).send({ message: 'Internal server error.' });
        }
    }
}
