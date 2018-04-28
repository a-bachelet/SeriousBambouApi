/**
 * Dependencies Imports
 */
import * as dotenv from 'dotenv';
import { MongoError } from 'mongodb';

/**
 * Classes Imports
 */
import { Database } from './database/database';
import { HttpServer } from './http-server/http-server';

/**
 * Environment vars configuration
 */
dotenv.config();

/**
 * Database instanciation
 */
const database: Database = new Database();

/**
 * HttpServer instanciation
 */
const http: HttpServer = new HttpServer();

/**
 * App start
 *
 * Initializes the database connection
 * Starts the HttpServer
 */
database.initDatabaseConnection((databaseError: MongoError | null, uri: string | null) => {
    if (databaseError) {
        console.log(databaseError);
        process.exit(1);
    } else {
        http.start((port: number) => {
            console.log('Rest API is listening on port : ' + port);
        });
    }
});
