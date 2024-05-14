import {ChangeEvent, FormEvent, useState} from "react";
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

    function goForward() {

        if (exerciseToCreate !== undefined &&
            factObjectIndex < exerciseToCreate.factObjects.length - 1) {
            setFactObjectIndex(factObjectIndex + 1);
        }
    }

    function goBack() {
        if (exerciseToCreate !== undefined &&
            factObjectIndex !== 0) {
            setFactObjectIndex(factObjectIndex - 1)
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

    return <div>
        <h1>RÄTT SVAR</h1>
        <p>Skriv in rätt svar per fakta på alla objekt.</p>
        <form onSubmit={handleSubmit}>
            <div
                className={styles.titleDiv}
            >
                <em><p>{exerciseToCreate?.factObjects[factObjectIndex].name}</p></em>
            </div>
            {
                exerciseToCreate?.factObjects[factObjectIndex].facts.map((fact) => <div
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
                        type="text"
                        value={fact.factValue}
                        onChange={(event) => handleInputChange(event, fact.factName, factObjectIndex)}
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
                    >
                        Skapa övning
                    </button>
                </div>
            }
        </form>
    </div>
}
