import { demoLandscapeAnswersKey, DemoResult } from "../data/data";
import { CheckAnswersRequest, Result } from "../pages/PracticePage";

const demoAnswersKey: DemoResult = demoLandscapeAnswersKey;

export function checkColdstartAnswers(checkAnswersRequest: CheckAnswersRequest | undefined) : Result {
    const answersById = new Map(
        (checkAnswersRequest?.answersPerFact ?? []).map((answer) => [answer.id, answer.givenAnswer])
    );

    const result: Result = {
        perFactObjects: demoAnswersKey.perFactObjects.map((factObject) => ({
            id: factObject.id,
            name: factObject.name,
            perFacts: factObject.perFacts.map((fact) => {
                const givenAnswer = answersById.get(fact.id) ?? "";
                return {
                    id: fact.id,
                    factObjectId: fact.factObjectId,
                    givenAnswer,
                    correctAnswer: fact.correctAnswer,
                    isCorrect: givenAnswer === fact.correctAnswer,
                    factName: fact.factName
                };
            })
        }))
    };
    return result;
}
