/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';

/**
 * Models import
 */

 import { Quizz, QuizzModel } from './quizz';

/**
 * QuestionModel Type Definition
 */
export type QuestionModel = Document & {
    label: string;
    quizz: QuizzModel;
};

/**
 * Question Schema Definition
 */
const QuestionSchema: Schema = new Schema({
    label: String,
    quizz: {
        type: Schema.Types.ObjectId,
        ref: 'Quizz'
    }
});

/**
 * Question Model Definition
 */
export const Question: Model<QuestionModel> = model<QuestionModel>('Question', QuestionSchema);
