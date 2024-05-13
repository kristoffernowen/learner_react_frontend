import styles from "./FactObjectForm.module.css"
import {CreateExercise, CreateFactObject} from "./ModelForm";
import InputWithLabel from "../general/InputWithLabel";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {StageOfCreation} from "../../pages/CreateExercisePage";
import GrayBorderedBox from "../general/GrayBorderedBox";
import UlToAdd from "../general/UlToAdd";
import LiToAdd from "../general/LiToAdd";

type FactObjectFormProps = {
    model: CreateFactObject;
    modelExercise: CreateExercise;
    setModelExercise: Dispatch<SetStateAction<CreateExercise>>;
    newExercise: CreateExercise;
    setNewExercise: Dispatch<SetStateAction<CreateExercise>>;
    setModelFactObject: Dispatch<SetStateAction<CreateFactObject>>;
    setStage: Dispatch<SetStateAction<StageOfCreation>>;
}

export default function FactObjectForm({
                                           model,
                                           modelExercise,
                                           setNewExercise,
                                           setStage
                                       }: FactObjectFormProps) {

    const [input, setInput] = useState<string>("");

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
    }

    function addFactObject(event: FormEvent) {
        event.preventDefault();
        if (input.trim() === "")
            return;
        setNewExercise(prevState => {
                if (prevState !== undefined) {

                    return {
                        name: prevState.name,
                        factObjects: [
                            ...prevState.factObjects,
                            {
                                name: input,
                                facts: model.facts,
                                useLikeThis: true
                            }
                        ]
                    }
                } else {
                    return prevState;
                }
            }
        )
        setInput("");
    }

    function removeItem(factNameToRemove: string) {
        setNewExercise((prevState) => {
                if (prevState !== undefined) {
                    return {
                        name: prevState.name ,
                        factObjects: prevState.factObjects.filter(fact => fact.name !== factNameToRemove)
                    };
                }
                return {
                    name: "",
                    factObjects: []
                }
            }
        );
    }

    return <form
        className={styles.form}
        onSubmit={addFactObject}
    >
        <div
            className={styles.leftDiv}
        >
            <p>Välj ett namn på ett faktaobjekt och lägg till det i övningen. Senare skriver du in rätt
                svar för alla fakta för varje faktaobjekt du lägger till här.</p>
            <InputWithLabel
                value={input}
                label="Skapa faktaobjekt med namn:"
                handleInputChange={handleInput}
                id="factObjectName"
            />
            <button
                className={styles.button}
            >Lägg till faktaobjekt i övningen
            </button>

            <button
                type="button"
                className={styles.button}
                onClick={() => {
                    setStage("setRightAnswerPerFactObject")
                }}
            >Gå vidare
            </button>

            <button
                type="button"
                onClick={() => setStage("factObjectModel")}
                className={styles.button}
            >Gå tillbaka till att namnge fakta
            </button>
        </div>
        <GrayBorderedBox>
            <p>Övningen kommer att innehålla följande faktaobjekt:</p>
            <UlToAdd>
                {modelExercise.factObjects.length > 0 && modelExercise.factObjects.map((fact) =>
                    <LiToAdd key={fact.name} name={fact.name} removeItem={removeItem}/>
                )}
            </UlToAdd>
        </GrayBorderedBox>
    </form>
}
