import {AnswerPerFact, CheckAnswersRequest, PracticeExercise} from "../../pages/PracticePage";
import React, {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import styles from "./ExerciseForm.module.css";

import {useGetRecordFor} from "../../customHooks/useGetRecordFor";
import {urls} from "../../utilities/urls";
import {Result} from "./ResultTable";

type ExerciseFormProps = {
    id: string | undefined;
    factObjectIndex: number;
    setFactObjectIndex: Dispatch<SetStateAction<number>>;
    checkAnswersRequest: CheckAnswersRequest | undefined;
    setCheckAnswersRequest: Dispatch<SetStateAction<CheckAnswersRequest | undefined>>;
    setResult: Dispatch<SetStateAction<Result | undefined>>;
}

export default function ExerciseForm({
                                         id,
                                         factObjectIndex,
                                         checkAnswersRequest,
                                         setCheckAnswersRequest,
                                         setFactObjectIndex,
                                         setResult
                                     }: ExerciseFormProps) {

    const getUrl: string = urls.startExercise;
    const postUrl: string = urls.checkAnswers;
    const [answers, setAnswers, isLoading] = useGetRecordFor<PracticeExercise>(
        `${getUrl}${id}`,
        {
            name: "",
            factObjects: [],
            id: ""
        });

    const inputRefs = useRef<HTMLInputElement[]>([]);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null);
    const continueButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            } else {
                if (!continueButtonRef.current) {
                    return;
                }
                if(factObjectIndex + 1 === answers?.factObjects.length && submitButtonRef.current){
                    submitButtonRef.current!.focus();
                }
                continueButtonRef.current!.focus();
            }
        }
    };

    useEffect(() => {
        async function post(url: string, body: CheckAnswersRequest) {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            setResult(data);
        }

        if (checkAnswersRequest !== undefined) {
            post(postUrl, checkAnswersRequest)
        }
    }, [checkAnswersRequest])

    function mapToCheckAnswersRequest(practiceExercise: PracticeExercise): CheckAnswersRequest {
        const answersPerFact: AnswerPerFact[] = [];
        practiceExercise.factObjects.forEach((factObject) => {
            factObject.facts.forEach((fact) => {
                answersPerFact.push({
                    id: fact.id,
                    factObjectId: fact.factObjectId,
                    givenAnswer: fact.factValue
                });
            });
        });
        return {
            id: practiceExercise.id,
            answersPerFact
        };
    }

    const [factIndex, setFactIndex] = useState(0);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (answers !== undefined) {
            const request = mapToCheckAnswersRequest(answers);
            setCheckAnswersRequest(() => {
                return {
                    id: request.id,
                    answersPerFact: request.answersPerFact
                }
            });
        }
        setFactIndex(prevState => prevState + 1);
        const input = document.querySelector(`#${answers?.factObjects[factObjectIndex].facts[factIndex].factName}`
        ) as HTMLInputElement | null;
        if (input) {
            input.focus();
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>, id: string, indexFactObject: number) {

        if (answers !== undefined) {
            setAnswers((prevState) => {
                if (prevState !== undefined) {
                    const factObjects = [...prevState.factObjects];
                    const factObjectToUpdate = factObjects[indexFactObject];

                    if (factObjectToUpdate) {
                        const updatedFacts = factObjectToUpdate.facts.map(fact => {
                            if (fact.id === id) {
                                return {...fact, factValue: event.target.value};
                            }
                            return fact;
                        });
                        factObjects[indexFactObject] = {
                            ...factObjectToUpdate,
                            facts: updatedFacts
                        };
                    }
                    return {
                        ...prevState,
                        factObjects: factObjects
                    };
                } else {
                    return answers
                }
            });
        }
    }

    function goForward() {

        if (answers !== undefined &&
            factObjectIndex < answers.factObjects.length - 1) {
            setFactObjectIndex(factObjectIndex + 1);
        }
    }

    function goBack() {
        if (answers !== undefined &&
            factObjectIndex !== 0) {
            setFactObjectIndex(factObjectIndex - 1);
        }
    }

    useEffect(() => {
        if (answers.factObjects.length === 0) return;
        const input = document.querySelector(`#${answers.factObjects[factObjectIndex].facts[0].factName}`
        ) as HTMLInputElement | null;
        if (input) {
            input.focus();
        }

    }, [factObjectIndex, answers.factObjects.length])

    if (isLoading) {
        return <p>Laddar...</p>
    }

    return <form
        className={styles.form}
        onSubmit={handleSubmit}>
        <div className={styles.titleDiv}>
            <strong><span>{answers.name}: </span></strong>
            <em><span>{answers.factObjects[factObjectIndex].name}</span></em>
        </div>
        {
            answers.factObjects[factObjectIndex].facts.map((fact, index) => <div
                key={fact.id}
                className={styles.exerciseDiv}
            >
                <label
                    className={styles.formLabel}
                    htmlFor={fact.factName}
                >
                    {fact.factName}
                </label>
                <input
                    ref={(element) => element && (inputRefs.current[index] = element)} // array is populated and use push by ref function
                    id={fact.factName}
                    type="text"
                    className={styles.formInput}
                    value={fact.factValue}
                    onChange={(event) => handleInputChange(event, fact.id, factObjectIndex)}
                    onKeyDown={(event) => handleInputKeyDown(event, index)}
                />
            </div>)
        }
        <div className={styles.multipleButtonDiv}>
            <button
                type="button"
                className={styles.broadButton}
                onClick={goBack}
                disabled={factObjectIndex <= 0}
            >
                Tillbaka
            </button>
            <button
                ref={continueButtonRef}
                type="button"
                className={styles.broadButton}
                onClick={goForward}
                disabled={factObjectIndex === answers.factObjects.length - 1}
            >
                Nästa
            </button>

        </div>
        {
            factObjectIndex === answers.factObjects.length - 1 && <div className={styles.sendAnswersDiv}>
                <button
                    className={styles.broadButton}
                    ref={submitButtonRef}
                >
                    Rätta svar
                </button>
            </div>
        }
    </form>
}
