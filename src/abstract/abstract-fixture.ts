/**
 * Dependencies Imports
 */
import { Document } from 'mongoose';

/**
 * Interfaces Imports
 */
import { IFixture } from '../interfaces/i-fixture';

/**
 * AbstractFixture Abstract Class Definition
 */
export abstract class AbstractFixture implements IFixture {

    public dependencies: string[] = []; // Fixture dependencies

    private references: Array<{ label: string, document: Document }>; // Fixture References

    /**
     * Sets the fixture references
     * @param references (Array<{ label: string, document: Document }>) Loaded fixture references array instance
     */
    constructor(references: Array<{ label: string, document: Document }>) {
        this.references = references;
    }

    /**
     * Returns a reference from the fixture references array
     * @param label (string) Reference label
     */
    public getReference(label: string): (Document | undefined) {
        const refIndex: number = this.references.findIndex(
            (ref: { label: string, document: Document }) => ref.label === label
        );
        return refIndex === -1 ? undefined : this.references[refIndex].document;
    }

    /**
     * Adds a reference to the fixture references array
     * @param label (string) Reference label
     * @param document (Document) Reference document
     */
    public setReference(label: string, document: Document): void {
        this.references.push({ label, document });
    }

    /**
     * Executes the fixture
     */
    public async execute(): Promise<null> {
        return new Promise<null>((resolve: any) => {
            resolve(null);
        });
    }

}
