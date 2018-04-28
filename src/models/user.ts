/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';

/**
 * UserModel Type Definition
 */
export type UserModel = Document & {
    username: string;
    exp: number;
};

/**
 * User Schema Definition
 */
const userSchema: Schema = new Schema({
    username: String,
    exp: Number
});

/**
 * User Model Definition
 */
export const User: Model<UserModel> = model<UserModel>('User', userSchema);
