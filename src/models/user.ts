/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';
import { PictureModel } from './picture';

/**
 * UserModel Type Definition
 */
export type UserModel = Document & {
    username: string;
    password: string;
    validUntil: Date;
    authToken: string;
    exp: number;
    profilepic: PictureModel;
};

/**
 * User Schema Definition
 */
const userSchema: Schema = new Schema({
    username: String,
    password: String,
    validUntil: Date,
    authToken: String,
    exp: Number,
    profilepic: {
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    }
});

/**
 * User Model Definition
 */
export const User: Model<UserModel> = model<UserModel>('User', userSchema);
