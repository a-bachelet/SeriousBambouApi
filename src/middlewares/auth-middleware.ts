/**
 * Dependencies Imports
 */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { MongoError } from 'mongodb';

/**
 * Models Imports
 */
import { User, UserModel } from '../models/user';

/**
 * AuthMiddleware Middleware Definition
 * @param req (Request) Incoming express request
 * @param res (Response) Outgoing express response
 * @param next (NextFunction) FUnction called after the middleware execution
 */
export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token: string | string[] | undefined = req.headers['auth-token'];
    if (token) {
        verify(token.toString(), process.env.JWT_SECRET || 'SERIOUSBAMBOU', {}, (errDecoded: any, decoded: any) => {
            if (errDecoded || !decoded) {
                res.status(401).send({ message: 'Invalid AuthToken.' });
            } else {
                User.findOne({ authToken: token }, (err: MongoError, user: UserModel) => {
                    if (!user) {
                        res.status(401).send({ message: 'Invalid AuthToken.' });
                    } else {
                        const newTime: number = (new Date()).getTime();
                        const validTime: number = user.validUntil.getTime();
                        if (newTime > validTime) {
                            res.status(401).send({ message: 'Expired AuthToken.' });
                        } else {
                            User.findOneAndUpdate(
                                { _id: user._id },
                                { validUntil: new Date((new Date()).setTime((new Date()).getTime() + 3600000)) },
                                { new: true },
                                (updateErr: MongoError, updateUser: UserModel | null) => {
                                    req['auth-user'] = updateUser;
                                    next();
                                }
                            );
                        }
                    }
                });
            }
        });
    } else {
        res.status(401).send({ message: 'Unauthorized !' });
    }
};
