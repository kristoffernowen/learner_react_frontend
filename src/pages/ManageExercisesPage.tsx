import LearnerTable, {ColumnName} from "../components/general/table/LearnerTable";
import {SelectExercise} from "./ChooseExercise";
import {type FunctionForLearnerTable} from "../components/general/table/LearnerTable";
import {urls} from "../utilities/urls";
import {useGetRecordsFor} from "../customHooks/useGetRecordsFor";
import {deleteWithFetch} from "../utilities/fetchUtility";

export default function ManageExercisesPage() {

    const [exercises, setExercises, loading, error] = useGetRecordsFor<SelectExercise>(urls.getExercises);

    const columnNames: ColumnName[] = [{
        columnName: "Namn",
        propName: "name"
    }];

    const buttonFunctions: FunctionForLearnerTable[] = [
        {
            buttonLabel: "Ta bort",
            tableFunction: async function deleteExercise(id?: string){
                const responseOk = await deleteWithFetch(urls.deleteExercise, id ? id : "no id");
                if(responseOk){
                    const updatedExercises = exercises.filter(x => x.id !== id);
                    setExercises(updatedExercises);
                }
            }
        }
    ];

    if(loading) return <div>Hämtar övningar...</div>
    if(error) return <div>Det blev ett fel: {error.message}</div>

    return <>
        <h1>Hantera övningar</h1>
        <LearnerTable data={exercises} columnNames={columnNames} buttonFunctions={buttonFunctions}/>
    </>
}
