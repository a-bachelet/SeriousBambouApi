/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';

/**
 * PictureModel Type Definition
 */
export type PictureModel = Document & {
    size: number;
    path: string;
    name: string;
    type: string;
    mtime: Date;
};

/**
 * Picture Schema Definition
 */
const pictureSchema: Schema = new Schema({
    size: Number,
    path: String,
    name: String,
    type: String,
    mtime: Date
});

/**
 * Picture Model Definition
 */
export const Picture: Model<PictureModel> = model<PictureModel>('Picture', pictureSchema);
