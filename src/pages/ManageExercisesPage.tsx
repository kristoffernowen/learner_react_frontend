import LearnerTable, {ColumnName} from "../components/general/table/LearnerTable";
import {SelectExercise} from "./Home";
import {type FunctionForLearnerTable} from "../components/general/table/LearnerTable";
import {urls} from "../utilities/urls";
import {useGetRecordsFor} from "../customHooks/useGetRecordsFor";

const columnNames: ColumnName[] = [{
    columnName: "Namn",
    propName: "name"
}];

const buttonFunctions: FunctionForLearnerTable[] = [
    {
        buttonLabel: "säg första",
        tableFunction: function sayFirst() {
            console.log("första")
        }
    },
    {
        buttonLabel: "säg id",
        tableFunction: function sayId(id?: string){
            console.log(id)
        }
    }
];

export default function ManageExercisesPage() {

    const [exercises, loading, error] = useGetRecordsFor<SelectExercise>(urls.getExercises);

    if(loading) return <div>Hämtar övningar...</div>
    if(error) return <div>Det blev ett fel: {error.message}</div>

    return <>
        <h1>Hantera övningar</h1>
        <LearnerTable data={exercises} columnNames={columnNames} buttonFunctions={buttonFunctions}/>
    </>
}
