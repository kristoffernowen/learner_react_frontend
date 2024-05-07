import {Link} from "react-router-dom";

export type SelectExercise = {
    name: string,
    id: string
};

type ExerciseProps = {
    exercise: SelectExercise,
};

export default function ExerciseItem({exercise}: ExerciseProps) {

    return <div className="exerciseDiv selectExerciseDiv">
        <span key={exercise.id}>Namn: {exercise.name}</span>
        <Link to={`practice-page/${exercise.id}`} ><button type="button">Gå till övning</button></Link>
    </div>
}
