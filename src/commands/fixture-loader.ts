/**
 * Dependencies Imports
 */
import * as chalk from 'chalk';
import * as dotenv from 'dotenv';
import * as inquirer from 'inquirer';
import { Document } from 'mongoose';
import { connect, connection } from 'mongoose';

/**
 * Fixtures Imports
 */
import { LevelFixture } from '../fixtures/level-fixture';
import { QuizzFixture } from '../fixtures/quizz-fixture';
import { ThemeFixture } from '../fixtures/theme-fixture';
import { UserFixture } from '../fixtures/user-fixture';

/**
 * Abstract Classes Imports
 */
import { AbstractFixture } from '../abstract/abstract-fixture';

/**
 * Environment Vars Configuration
 */
dotenv.config();

/**
 * References instanciation
 */
const references: Array<{ label: string, document: Document }> = [];

/**
 * Fixtures instanciation
 */
const fixtures: AbstractFixture[] = [
    new LevelFixture(references),
    new QuizzFixture(references),
    new ThemeFixture(references),
    new UserFixture(references)
];

/**
 * Loaded fixtures array instanciation
 */
const loadedFixtures: string[] = [];

/**
 * Environment vars loading
 */
const mongodbHost: string = process.env.MONGODB_HOST || 'localhost';
const mongodbPort: string = process.env.MONGODB_PORT || '27017';
const mongodbDatabase: string = process.env.MONGODB_DATABASE || 'SeriousBambou';

/**
 * Command start
 */
inquirer.prompt([
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Careful, database will be purged. Do you want to continue ?',
        default: false
    }
]).then(({ confirm }) => {

    if (confirm === true) {

        connect(`mongodb://${mongodbHost}:${mongodbPort}/${mongodbDatabase}`, async (object: any) => {

            await connection.db.dropDatabase();

            while (loadedFixtures.length !== fixtures.length) {

                for (const f in fixtures) {
                    if (fixtures[f]) {

                        if (loadedFixtures.findIndex((lf: string) => lf === fixtures[f].constructor.name) === -1) {

                            let deps: boolean = false;

                            fixtures[f].dependencies.forEach((dep: string) => {
                                if (loadedFixtures.findIndex((lf: string) => lf === dep) === -1) {
                                    deps = true;
                                }
                            });

                            if (!deps) {
                                await fixtures[f].execute();
                                console.log(chalk.default.green.bold('  ' + fixtures[f].constructor.name + ' loaded !'));
                                loadedFixtures.push(fixtures[f].constructor.name);
                            }

                        }

                    }
                }

            }

            connection.close();

        });
    }

});
