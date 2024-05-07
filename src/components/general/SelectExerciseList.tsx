import {useEffect, useState} from "react";
import ExerciseItem from "./ExerciseItem";
import {type SelectExercise} from "./ExerciseItem";
import {get} from "../../utilities/httpService";


export default function SelectExerciseList() {
    const [exercises, setExercises] = useState<SelectExercise[]>([]);

    const url: string = 'koffes-learner-api.azurewebsites.net/api/Exercise';
    useEffect(() => {
        async function getExercises(url: string) {
            try {
                const data = await get<SelectExercise[]>(url);
                setExercises(data);
            } catch (error) {
                console.log(error)
            }
        }

        getExercises(url);
        if (exercises.length > 0) {
            exercises.map((item) => console.log(item));
        }
    }, [])

    return <div className="selectDiv">
        {exercises.length > 0 && <div className="selectDiv">
            {
                exercises.map((exercise) => (<ExerciseItem key={exercise.id} exercise={exercise}/>))
            }
        </div>}
        {exercises.length === 0 && <div className="selectDiv">
            <p>Inga övningar än.</p>
        </div>}
    </div>
}
