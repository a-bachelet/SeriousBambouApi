/**
 * Dependencies Imports
 */
import { genSaltSync, hashSync } from 'bcrypt-nodejs';
import * as md5 from 'md5';

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
                exp: 0
            });

            this.setReference('user-mike-tyson', userMikeTyson);

            resolve(null);

        });
    }

}
