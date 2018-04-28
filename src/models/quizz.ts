/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';

/**
 * Models Imports
 */
import { Theme, ThemeModel } from './theme';

/**
 * QuizzModel Type Definition
 */
export type QuizzModel = Document & {
    label: string;
    theme: ThemeModel;
};

/**
 * Quizz Schema Definition
 */
const quizzSchema: Schema = new Schema({
    label: String,
    theme: {
        type: Schema.Types.ObjectId,
        ref: 'Theme'
    }
});

/**
 * Quizz Model Definition
 */
export const Quizz: Model<QuizzModel> = model<QuizzModel>('Quizz', quizzSchema);
