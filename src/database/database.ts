/**
 * Dependencies Imports
 */
import * as bluebird from 'bluebird';
import { MongoError } from 'mongodb';
import * as mongoose from 'mongoose';

/**
 * Database Class Definition
 */
export class Database {

    private databaseHost: string; // Database hostname
    private databasePort: number; // Database listening port
    private databaseName: string; // Database name

    /**
     * Replaces the mongoose Promise library with the bluebird one
     * Sets the database host
     * Sets the database port
     * Sets the database name
     */
    constructor() {
        (<any> mongoose).Promise = bluebird;
        this.databaseHost = process.env.MONGODB_HOST || 'localhost';
        this.databasePort = Number(process.env.MONGODB_PORT) || 27017;
        this.databaseName = process.env.MONGODB_DATABASE || 'SeriousBambou';
    }

    /**
     * Instantiates a MongoDB connection thanks to mongoose
     * @param callback (Function) Function called after mongoose connection initialization
     */
    public initDatabaseConnection(callback: (error: MongoError | null, uri: string | null) => void): Promise<string> | void {
        const uri: string = 'mongodb://' + this.databaseHost + ':' + this.databasePort + '/' + this.databaseName;
        mongoose.connect(uri, {}, (error: MongoError) => {
            callback(error, uri);
        });
    }

}
