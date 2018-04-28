/**
 * Dependencies Imports
 */
import { Document } from 'mongoose';

/**
 * IFixture Interface Definition
 */
export interface IFixture {

    dependencies: string[]; // Fixture dependencies

    /**
     * Fetch fixture references for a reference with a matching label
     * Returns the fixture reference document
     * @param label (string) Reference label
     */
    getReference(label: string): (Document | undefined); // Returns a mongoose Document by a passed label

    /**
     * Sets a mongoose document as a global fixture reference
     * @param label (string) Reference label
     * @param document (Document) Reference document object
     */
    setReference(label: string, document: Document): void;

    /**
     * Executes the fixture
     */
    execute(): Promise<null>;

}
