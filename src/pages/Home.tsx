import LearnerTable, {ColumnName, FunctionForLearnerTable} from "../components/general/table/LearnerTable";
import {urls} from "../utilities/urls";
import {useGetDataFor} from "../customHooks/useGetDataFor";

export type SelectExercise = {
    name: string,
    id: string
};

const columnNames: ColumnName[] = [{
    columnName: "Namn",
    propName: "name"
}];

const buttonFunctions: FunctionForLearnerTable[] = [
    {
        buttonLabel: "Starta övning",
        tableFunction: function startExercise(id?: string) {
            console.log(`starta för övning med id ${id}`)
        }
    },
    {
        buttonLabel: "Visa detaljer",
        tableFunction: function showId(id?: string){
            console.log(id)
        }
    }
];

export default function Home() {

    const [exercises, loading, error] = useGetDataFor<SelectExercise>(urls.getExercises);

    if(loading) return <div>Hämtar övningar...</div>
    if(error) return <div>Det blev ett fel: {error.message}</div>

    return (
        <>
            <h1>Hem</h1>
            <LearnerTable data={exercises} columnNames={columnNames} buttonFunctions={buttonFunctions}/>
        </>
    )
}

