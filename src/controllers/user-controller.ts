/**
 * Dependencies Imports
 */
import { Request, Response } from 'express';
import * as formidable from 'formidable';
import * as fs from 'fs';
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
import { Picture, PictureModel } from '../models/picture';

/**
 * UserController Class Definition
 */
export class UserController extends AbstractController {

    protected routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getUsers, middlewares: [] },
        { method: 'GET', path: '/:id', callable: this.getUser, middlewares: [] },
        { method: 'GET', path: '/:id/level', callable: this.getUserLevel, middlewares: [] },
        { method: 'POST', path: '/:id/profilepic', callable: this.postUserProfilePic, middlewares: [] }
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
            if (err) {
                res.status(500).send({ message: 'Internal server error.' });
            } else {
                if (!user) {
                    res.status(404).send({ message: 'User not found.' });
                } else {
                    res.send(user);
                }
            }
        });
    }

    /**
     * Returns the level of a user found in the database
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getUserLevel(req: Request, res: Response): void {
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

    /**
     * Defines a photo as the user profile pic
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private postUserProfilePic(req: Request, res: Response): void {
        const id = req.params.id;
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.multiples = false;
        form.uploadDir = './public/uploads';
        form.on('profile', (name, field) => {
            console.log('Got file : ' + name.message);
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(500).send('Internal server error.');
            } else {
                let file: any = null;
                for (const oldFile in files) {
                    if (files[oldFile]) {
                        file = files[oldFile];
                    }
                }
                Picture.create(file, (errPic: MongoError, picture: PictureModel) => {
                    if (err) {
                        res.status(500).send({ message: 'Internal server error.' });
                    } else {
                        User.findOneAndUpdate(
                            { _id: id },
                            { profilepic: picture._id },
                            {  })
                            .populate('profilepic')
                            .exec((errUser: MongoError, user: UserModel | null) => {
                                if (user) {
                                    fs.unlinkSync(user.profilepic.path);
                                    user.profilepic = picture;
                                }
                                res.status(200).send(user);
                        });
                    }
                });
            }
        });
    }

}
