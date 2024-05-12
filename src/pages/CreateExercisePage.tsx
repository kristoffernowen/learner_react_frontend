
import ModelForm, {CreateFactObject, CreateExercise} from "../components/createExercise/ModelForm";
import {useState} from "react";
import FactObjectForm from "../components/createExercise/FactObjectForm";
import NameExercise from "../components/createExercise/NameExercise";
import CreateExerciseForm from "../components/createExercise/CreateExerciseForm";

export type StageOfCreation =
    "nameOfExercise"
    | "factObjectModel"
    | "nameOfFactObjects"
    | "setRightAnswerPerFactObject";

export default function CreateExercisePage() {
    const [modelFactObject, setModelFactObject] = useState<CreateFactObject>({
        name: "",
        facts: [],
        useLikeThis: false
    });

    const [modelExercise, setModelExercise] = useState<CreateExercise>({
        name: "",
        factObjects: []
    });
    const [stage, setStage] = useState<StageOfCreation>("nameOfExercise");

    return <>
        {
            stage === "nameOfExercise" && <NameExercise
                modelExercise={modelExercise}
                setModelExercise={setModelExercise}
                setStage={setStage}
            />
        }
        {
            stage === "factObjectModel" &&
            <ModelForm
                modelFactObject={modelFactObject}
                setModelFactObject={setModelFactObject}
                stage={stage}
                setStage={setStage}
            />
        }
        {
            stage === "nameOfFactObjects" &&

            <FactObjectForm
                model={modelFactObject}
                modelExercise={modelExercise}
                setModelExercise={setModelExercise}
                setStage={setStage}
                newExercise={modelExercise}
                setNewExercise={setModelExercise}
                setModelFactObject={setModelFactObject}
            />


        }
        {
            stage === "setRightAnswerPerFactObject" &&
            <CreateExerciseForm
                modelExercise={modelExercise}
            />
        }
    </>
}
