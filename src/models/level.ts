/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';

/**
 * LevelModel Type Definition
 */
export type LevelModel = Document & {
    reqExp: number;
    label: string;
};

/**
 * Level Schema Definition
 */
const levelSchema: Schema = new Schema({
    reqExp: Number,
    label: String
});

/**
 * Level Model Definition
 */
export const Level: Model<LevelModel> = model<LevelModel>('Level', levelSchema);
