/**
 * Models Imports
 */
import { Quizz, QuizzModel } from '../models/quizz';

/**
 * Abstract Classes Imports
 */
import { AbstractFixture } from '../abstract/abstract-fixture';

/**
 * Fixtures Imports
 */
import { ThemeFixture } from './theme-fixture';

/**
 * QuizzFixture Class Definition
 */
export class QuizzFixture extends AbstractFixture {

    public dependencies: string[] = [
        ThemeFixture.name
    ];

    /**
     * Creates quizzs in the database
     * Sets their documents as global fixture references
     */
    public execute(): Promise<null> {
        return new Promise<null>(async (resolve: any) => {

            const quizzArtFirst: QuizzModel = await Quizz.create({
                label: 'Quizz Art First',
                theme: this.getReference('theme-art')
            });

            const quizzArtSecond: QuizzModel = await Quizz.create({
                label: 'Quizz Art Second',
                theme: this.getReference('theme-art')
            });

            this.setReference('quizz-art-first', quizzArtFirst);
            this.setReference('quizz-art-second', quizzArtSecond);

            resolve(null);

        });
    }

}
