/**
 * Models Imports
 */
import { Theme, ThemeModel } from '../models/theme';

/**
 * Abstract Classes Imports
 */
import { AbstractFixture } from '../abstract/abstract-fixture';

/**
 * ThemeFixture Class Definition
 */
export class ThemeFixture extends AbstractFixture {

    /**
     * Creates themes in the database
     * Sets their documents as global fixture references
     */
    public execute(): Promise<null> {
        return new Promise<null>(async (resolve: any) => {

            const themeArt: ThemeModel = await Theme.create({
                label: 'ThemeArt'
            });

            this.setReference('theme-art', themeArt);

            resolve(null);

        });
    }

}
