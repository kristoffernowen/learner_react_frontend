import InputWithLabel from "../general/InputWithLabel";
import {ChangeEvent, ComponentPropsWithoutRef, Dispatch, FormEvent, SetStateAction, useState} from "react";
import styles from "./ModelForm.module.css"
import {StageOfCreation} from "../../pages/CreateExercisePage";
import GrayBorderedBox from "../general/GrayBorderedBox";
import UlToAdd from "../general/UlToAdd";
import LiToAdd from "../general/LiToAdd";

export type CreateExercise = {
    name: string;
    factObjects: CreateFactObject[];
}

export type CreateFactObject = {
    name: string;
    facts: CreateFact[];
    useLikeThis: boolean;
}

export type CreateFact = {
    factName: string;
    factValue: string;
    factType: string;
}

type ModelFormProps = {
    modelFactObject: CreateFactObject;
    setModelFactObject: Dispatch<SetStateAction<CreateFactObject>>;
    stage: StageOfCreation;
    setStage: Dispatch<SetStateAction<StageOfCreation>>;
} & ComponentPropsWithoutRef<"form">

export default function ModelForm({
                                      modelFactObject,
                                      setModelFactObject,
                                      setStage
                                  }: ModelFormProps) {

    const [newFact, setNewFact] = useState<string>("");

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setNewFact(event.target.value);
    }

    function Add(event: FormEvent) {
        event.preventDefault();
        if(newFact.trim() === "")
            return;
        setModelFactObject((prevState) => {
            if (prevState !== undefined) {
                return {
                    ...prevState,
                    facts: [...prevState.facts, {
                        factName: newFact,
                        factValue: "",
                        factType: "string"
                    }]
                }
            }
            return {
                name: "",
                useLikeThis: true,
                facts: []
            };
        })
        setNewFact("");
    }

    function Continue(event: FormEvent) {
        event.preventDefault();
        setModelFactObject(prevState => {
            if (prevState !== undefined) {
                return {
                    ...prevState,
                    useLikeThis: true
                }
            }
            return {
                name: "",
                useLikeThis: false,
                facts: []
            }
        })
        setStage("nameOfFactObjects");
    }

    function removeItem(factNameToRemove: string) {
        setModelFactObject((prevState?) => {
                if(prevState !== undefined) {
                    return {
                        ...prevState,
                        facts: prevState.facts.filter(fact => fact.factName !== factNameToRemove)
                    };
                }
                return {
                    name: "",
                    useLikeThis: false,
                    facts: []
                }
            }
        );
    }

    return <form
        className={styles.form}
        onSubmit={Add}
    >

        <div
            className={styles.leftDiv}
        >
            <p>Bygg upp vilka fakta (t ex vikt) som ska ingå i varje faktaobjekt (t ex tiger) i övningen (t ex djur). Lägg till vad faktan ska ha för namn.
                Senare skriver du in vilket värde, eller rätt svar, varje fakta per faktaobjekt ska ha.</p>
            <InputWithLabel label="namn på fakta" id="newFact" value={newFact} handleInputChange={handleInputChange}/>
            <button className={styles.myButton} >Lägg till</button>
            <button className={styles.myButton} type="button" onClick={Continue}>Gå vidare</button>
        </div>
        <GrayBorderedBox
            className={styles.grayBox}
        >
            <p>Övningen kommer att innehålla följande fakta per objekt:</p>
            <UlToAdd>
                {modelFactObject.facts.length > 0 && modelFactObject.facts.map((fact) =>
                    <LiToAdd name={fact.factName} key={fact.factName} removeItem={removeItem} />
                )}
            </UlToAdd>
        </GrayBorderedBox>
    </form>
}
