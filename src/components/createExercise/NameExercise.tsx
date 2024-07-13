import {CreateExercise} from "./ModelForm";
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef} from "react";
import {StageOfCreation} from "../../pages/CreateExercisePage";
import styles from "./NameExercise.module.css"

type NameExerciseProps = {
    modelExercise: CreateExercise;
    setModelExercise: Dispatch<SetStateAction<CreateExercise>>;
    setStage: Dispatch<SetStateAction<StageOfCreation>>;
}

export default function NameExercise({modelExercise, setModelExercise, setStage}: NameExerciseProps) {

    const continueButton = useRef<HTMLButtonElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef) {
            return;
        }
        inputRef.current!.focus();
    }, [])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setModelExercise(prevState => {
            if (prevState !== undefined) {
                return {
                    name: event.target.value,
                    factObjects: prevState.factObjects
                }
            }
            return {
                name: "",
                factObjects: []
            }
        });
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (!continueButton.current) {
                return;
            }
            continueButton.current!.focus();
        }
    }

    return <div
        className={styles.container}
    >
        <p>Namnge övningen.</p>

        <div
            className={styles.topDiv}
        >
            <label
                htmlFor="exerciseName"
            >
                Namn på övningen:
            </label>
            <input
                ref={inputRef}
                id="exerciseName"
                type="text"
                className={styles.input}
                value={modelExercise.name}
                onChange={(event) => handleInputChange(event)}
                onKeyDown={(event) => handleKeyDown(event)}
            />
        </div>
        <button
            className={styles.nameButton}
            onClick={() => setStage("factObjectModel")}
            ref={continueButton}
            disabled={modelExercise.name.trim() === "" }
        >
            Gå vidare
        </button>

    </div>
}
