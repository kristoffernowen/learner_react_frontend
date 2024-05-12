import {CreateExercise} from "./ModelForm";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {StageOfCreation} from "../../pages/CreateExercisePage";
import styles from "./NameExercise.module.css"
import InputWithLabel from "../general/InputWithLabel";

type NameExerciseProps = {
    modelExercise: CreateExercise;
    setModelExercise: Dispatch<SetStateAction<CreateExercise>>;
    setStage: Dispatch<SetStateAction<StageOfCreation>>;
}

export default function NameExercise({modelExercise, setModelExercise, setStage}: NameExerciseProps) {

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

    return <>
        <p>Namnge övningen.</p>
        <InputWithLabel
            label="Namn på övningen:"
            id="exerciseName"
            value={modelExercise.name}
            handleInputChange={handleInputChange}
        />
        <button
            className={styles.nameButton}
            onClick={() => setStage("factObjectModel")}
        >
            Gå vidare
        </button>
    </>
}
