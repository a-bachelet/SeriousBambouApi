/**
 * Dependencies Imports
 */
import { Document, model, Model, Schema } from 'mongoose';

/**
 * ThemeModel Type Definition
 */
export type ThemeModel = Document & {
    label: string;
};

/**
 * Theme Schema Definition
 */
const themeSchema: Schema = new Schema({
    label: String
});

/**
 * Theme Model Definition
 */
export const Theme: Model<ThemeModel> = model<ThemeModel>('Theme', themeSchema);
