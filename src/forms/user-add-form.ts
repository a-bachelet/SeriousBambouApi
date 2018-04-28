/**
 * Definitions Imports
 */
import { check, ValidationChain } from 'express-validator/check';
import { MongoError } from 'mongodb';

/**
 * Models Imports
 */
import { User, UserModel } from '../models/user';

/**
 * UserAddForm Form Definition
 */
export const UserAddForm: ValidationChain[] = [
    check('username')
        .isEmail()
        .withMessage('Must be a valid email address.')
        .trim()
        .normalizeEmail({ gmail_remove_dots: false })
        .custom((username: string) => new Promise((resolve: any) => {
            User.findOne({ username }, (error: MongoError, user: UserModel) => {
                if (user) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        }))
        .withMessage('Username already in use.'),

    check('exp')
        .isNumeric()
        .withMessage('Must be a number')
];
