import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {CreateExercise, CreateFactObject} from "./ModelForm";
import {useNavigate} from "react-router";
import styles from "./CreateExerciseForm.module.css";
import {urls} from "../../utilities/urls";
import {post} from "../../utilities/fetchUtility";

type CreateExerciseFormProps = {
    modelExercise: CreateExercise;
}

export default function CreateExerciseForm({
                                               modelExercise,
                                           }: CreateExerciseFormProps) {

    const navigate = useNavigate();

    const [factObjectIndex, setFactObjectIndex] = useState(0);
    const [exerciseToCreate, setExerciseToCreate] = useState<CreateExercise | undefined>(
        modelExercise
    );

    function handleInputChange(event: ChangeEvent<HTMLInputElement>, factName: string, indexFactObject: number) {

        if (exerciseToCreate !== undefined) {
            setExerciseToCreate((prevState) => {
                if (prevState !== undefined) {
                    const factObjects = [...prevState.factObjects];
                    const factObjectToUpdate = factObjects[indexFactObject];

                    if (factObjectToUpdate) {
                        const updatedFacts = factObjectToUpdate.facts.map(fact => {
                            if (fact.factName === factName) {
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
                    return exerciseToCreate
                }
            });
        }
    }

    const inputRefs = useRef<HTMLInputElement[]>([]);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null);
    const continueButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number, factObjectIndex: number) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            } else {
                if (!continueButtonRef.current) {
                    return;
                }
                if(factObjectIndex + 1 === exerciseToCreate?.factObjects.length && submitButtonRef.current){
                    submitButtonRef.current!.focus();
                }
                continueButtonRef.current!.focus();
            }
        }
    };

    useEffect(() => {
        const input =
            document.getElementById(`${exerciseToCreate?.factObjects[factObjectIndex].facts[0].factName}`) as HTMLInputElement | null;
        if (input) {
            input.focus();
        }
    }, []);

    function goForward() {

        if (exerciseToCreate !== undefined &&
            factObjectIndex < exerciseToCreate.factObjects.length - 1) {
            setFactObjectIndex(factObjectIndex + 1);
            const input =
                document.getElementById(`${exerciseToCreate?.factObjects[factObjectIndex].facts[0].factName}`) as HTMLInputElement | null;
            if (input) {
                input.focus();
            }
        }
    }

    function goBack() {
        if (exerciseToCreate !== undefined &&
            factObjectIndex !== 0) {
            setFactObjectIndex(factObjectIndex - 1)
            const input =
                document.getElementById(`${exerciseToCreate?.factObjects[factObjectIndex].facts[0].factName}`) as HTMLInputElement | null;
            if (input) {
                input.focus();
            }
        }
    }

    function crappyValidationEverythingHaveValues(): boolean {
        if (exerciseToCreate === undefined) return false;

        if (nameDoesNotExist(exerciseToCreate.name))
            return false;

        if (factObjectsLengthIsZero(exerciseToCreate.factObjects))
            return false;

        if (anyFactObjectsFactsLengthIsZero(exerciseToCreate.factObjects)) {
            return false;
        }

        if (anyFactsFactValueIsEmpty(exerciseToCreate.factObjects)) {
            return false;
        }

        return true;
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const url: string = urls.postExercise;
        if (exerciseToCreate !== undefined) {
            const result = await post<CreateExercise, CreateExercise>(url, exerciseToCreate);
            console.log(result);
        }
        setExerciseToCreate(undefined);
        navigate("/");
    }

    function nameDoesNotExist(name: string): boolean {
        if (name === "")
            return true;
        else return false;
    }

    function factObjectsLengthIsZero(factObjects: CreateFactObject[]): boolean {
        if (factObjects.length === 0)
            return true;
        return false;
    }

    function anyFactObjectsFactsLengthIsZero(factObjects: CreateFactObject[]): boolean {
        if (factObjects.every(fo => fo.facts.length === 0))
            return true;
        return false;
    }

    function anyFactsFactValueIsEmpty(factObjects: CreateFactObject[]): boolean {
        if (factObjects.some(fo =>
            fo.facts.some(f =>
                f.factValue === ""
            )))
            return true;
        return false;
    }

    return <div
        className={styles.container}
    >
        <p>Skriv in rätt svar per fakta på alla objekt.</p>
        <form onSubmit={handleSubmit}>
            <div
                className={styles.titleDiv}
            >
                <em><p>{exerciseToCreate?.factObjects[factObjectIndex].name}</p></em>
            </div>
            {
                exerciseToCreate?.factObjects[factObjectIndex].facts.map((fact, index) => <div
                    key={fact.factName}
                    className={styles.rightAnswersDiv}
                >
                    <label
                        htmlFor={fact.factName}
                    >
                        {fact.factName}
                    </label>
                    <input
                        id={fact.factName}
                        ref={(element) => element && (inputRefs.current[index] = element)} // array is populated and use push by ref function
                        type="text"
                        value={fact.factValue}
                        onChange={(event) => handleInputChange(event, fact.factName, factObjectIndex)}
                        onKeyDown={(event) => handleInputKeyDown(event, index, factObjectIndex)}
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
                    disabled={factObjectIndex === (exerciseToCreate ? exerciseToCreate.factObjects.length - 1 : factObjectIndex)}
                >
                    Nästa
                </button>

            </div>
            {
                crappyValidationEverythingHaveValues() && <div className={styles.sendAnswerDiv}>
                    <button
                        className="broadButton"
                        ref={submitButtonRef}
                    >
                        Skapa övning
                    </button>
                </div>
            }
        </form>
    </div>
}
