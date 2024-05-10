import {useParams} from "react-router";
import {useState} from "react";
import ResultBox, {Result} from "../components/doExercise/ResultBox";
import ExerciseForm from "../components/doExercise/ExerciseForm";

export type PracticeExercise = {
    name: string;
    id: string;
    factObjects: FactObject[]
}

export type FactObject = {
    name: string;
    id: string;
    exerciseId: string;
    facts: Fact[]
}

export type Fact = {
    id: string;
    factObjectId: string;
    factName: string;
    factType: string;
    factValue: string;
}

export type CheckAnswersRequest = {
    id: string;
    answersPerFact: AnswerPerFact[];
}

export type AnswerPerFact = {
    id: string;
    factObjectId: string;
    givenAnswer: string;
}

export default function PracticePage() {

    let {id} = useParams();

    const [factObjectIndex, setFactObjectIndex] = useState(0);
    const [checkAnswersRequest, setCheckAnswersRequest] = useState<CheckAnswersRequest | undefined>();
    const [result, setResult] = useState<Result | undefined>();

    const content = result === undefined ?
        <ExerciseForm
            id={id}
            factObjectIndex={factObjectIndex}
            setFactObjectIndex={setFactObjectIndex}
            checkAnswersRequest={checkAnswersRequest}
            setCheckAnswersRequest={setCheckAnswersRequest}
            setResult={setResult}
        /> :
        <ResultBox
            result={result}
        />


    return (
        <>
            <h1>Öva</h1>
            <p>Skriv in rätt svar per objekt och få dina svar rättade.</p>
            {content}
        </>
    )
}
