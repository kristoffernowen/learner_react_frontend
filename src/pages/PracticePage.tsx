import {useParams} from "react-router";
import {useState} from "react";
import ExerciseForm from "../components/doExercise/ExerciseForm";
import ResultTable from "../components/doExercise/ResultTable";

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

export type Result = {
    perFactObjects: FactObjectResult[];
}

export type FactObjectResult = {
    id: string;
    name: string;
    perFacts: factResult[];
}

export type factResult = {
    id: string;
    factObjectId: string;
    givenAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    factName: string
}

export default function PracticePage() {

    let {id} = useParams();

    const [factObjectIndex, setFactObjectIndex] = useState(0);
    const [checkAnswersRequest, setCheckAnswersRequest] = useState<CheckAnswersRequest | undefined>();
    const [result, setResult] = useState<Result | undefined>();

    const exerciseForm = result === undefined ?
        <ExerciseForm
            id={id}
            factObjectIndex={factObjectIndex}
            setFactObjectIndex={setFactObjectIndex}
            checkAnswersRequest={checkAnswersRequest}
            setCheckAnswersRequest={setCheckAnswersRequest}
            setResult={setResult}
        /> :
        <ResultTable
            result={result}
        />

    return (
        <>
            <h1>Öva</h1>
            <p>Skriv in rätt svar per objekt och få dina svar rättade.</p>
            {exerciseForm}
        </>
    )
}
