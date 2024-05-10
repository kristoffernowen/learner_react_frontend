import LearnerTable, {ColumnName, FunctionForLearnerTable} from "../components/general/table/LearnerTable";
import {urls} from "../utilities/urls";
import {useGetRecordsFor} from "../customHooks/useGetRecordsFor";
import {useNavigate} from "react-router";

export type SelectExercise = {
    name: string,
    id: string
};

const columnNames: ColumnName[] = [{
    columnName: "Namn",
    propName: "name"
}];



export default function Home() {

    const [exercises, loading, error] = useGetRecordsFor<SelectExercise>(urls.getExercises);

    const navigate = useNavigate();

    const buttonFunctions: FunctionForLearnerTable[] = [
        {
            buttonLabel: "Starta övning",
            tableFunction: function startExercise(id?: string) {
                navigate(`/practice-page/${id}`)
            }
        },
        {
            buttonLabel: "Visa detaljer",
            tableFunction: function showId(id?: string){
                console.log(id)
            }
        }
    ];

    if(loading) return <div>Hämtar övningar...</div>
    if(error) return <div>Det blev ett fel: {error.message}</div>

    return (
        <>
            <h1>Hem</h1>
            <LearnerTable data={exercises} columnNames={columnNames} buttonFunctions={buttonFunctions}/>
        </>
    )
}

