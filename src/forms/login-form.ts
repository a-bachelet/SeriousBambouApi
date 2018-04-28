/**
 * Dependencies Imports
 */
import { check, ValidationChain } from 'express-validator/check';

/**
 * LoginForm Form Definition
 */
export const LoginForm: ValidationChain[] = [
    check('username')
        .isEmail()
        .withMessage('Must be a valid email address.')
        .trim()
        .normalizeEmail({ gmail_remove_dots: false }),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Must be at least 8 characters.')
        .matches(/\d/)
        .withMessage('Must contain a number.')
];
