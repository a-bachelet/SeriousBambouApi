/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';

/**
 * Models import
 */
import { Quizz, QuizzModel } from './quizz';
import { User, UserModel } from './user';

/**
 * PlayModel Type Definition
 */
export type PlayModel = Document & {
    user: UserModel;
    quizz: QuizzModel;
};

/**
 * Play Schema Definition
 */
const playSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quizz: {
        type: Schema.Types.ObjectId,
        ref: 'Quizz'
    }
});

/**
 * Play Model Definition
 */
export const Play: Model<PlayModel> = model<PlayModel>('Play', playSchema);
