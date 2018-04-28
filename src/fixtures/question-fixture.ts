/**
 * Models Imports
 */
import { Question, QuestionModel } from '../models/question';

/**
 * Abstract Classes Imports
 */
import { AbstractFixture } from '../abstract/abstract-fixture';

/**
 * Fixtures Imports
 */
import { QuizzFixture } from './quizz-fixture';

/**
 * QuestionFixture Class Definition
 */
export class QuestionFixture extends AbstractFixture {

    public dependencies: string[] = [
        QuizzFixture.name
    ];

    /**
     * Creates questions in the database
     * Sets their documents as global fixture references
     */
    public execute(): Promise<null> {
        return new Promise<null>(async (resolve: any) => {

            const questionOne: QuestionModel = await Question.create({
                label: 'Question One',
                quizz: this.getReference('quizz-art-first')
            });

            const questionTwo: QuestionModel = await Question.create({
                label: 'Question Two',
                quizz: this.getReference('quizz-art-first')
            });

            this.setReference('question-one', questionOne);
            this.setReference('question-two', questionTwo);

            resolve(null);

        });
    }

}
