/**
 * Dependencies Imports
 */
import * as bcrypt from 'bcrypt-nodejs';

/**
 * Models Imports
 */
import { User, UserModel } from '../models/user';

/**
 * Abstract Classes Imports
 */
import { AbstractFixture } from '../abstract/abstract-fixture';

/**
 * UserFixture Class Definition
 */
export class UserFixture extends AbstractFixture {

    /**
     * Creates users in the database
     * Sets their documents as global fixture references
     */
    public execute(): Promise<null> {
        return new Promise<null>(async (resolve: any) => {

            const userMikeTyson: UserModel = await User.create({
                username: 'mike-tyson@gmail.com',
                password: bcrypt.hashSync('hackathon2018'),
                validUntil: new Date(),
                authToken: null,
                exp: 0
            });

            this.setReference('user-mike-tyson', userMikeTyson);

            resolve(null);

        });
    }

}
