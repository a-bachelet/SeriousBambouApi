/**
 * Models Imports
 */
import { Level, LevelModel } from '../models/level';

/**
 * Abstract Classes Imports
 */
import { AbstractFixture } from '../abstract/abstract-fixture';

/**
 * LevelFixture Class Definition
 */
export class LevelFixture extends AbstractFixture {

    /**
     * Creates levels in the database
     * Sets their documents as global fixture references
     */
    public execute(): Promise<null> {
        return new Promise<null>(async (resolve: any) => {

            const levelBronzeBambou: LevelModel = await Level.create({
                label: 'Bronze Bambou',
                reqExp: 0
            });

            const levelSilverBambou: LevelModel = await Level.create({
                label: 'Silver Bambou',
                reqExp: 10
            });

            const levelGoldBambou: LevelModel = await Level.create({
                label: 'Gold Bambou',
                reqExp: 20
            });

            const levelHolyBambou: LevelModel = await Level.create({
                label: 'Holy Bambou',
                reqExp: 50
            });

            this.setReference('level-bronze-bambou', levelBronzeBambou);
            this.setReference('level-silver-bambou', levelSilverBambou);
            this.setReference('level-gold-bambou', levelGoldBambou);
            this.setReference('level-holy-bambou', levelHolyBambou);

            resolve(null);

        });
    }

}
