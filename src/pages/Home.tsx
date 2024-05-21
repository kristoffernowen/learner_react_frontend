import LearnerTable, {ColumnName, FunctionForLearnerTable} from "../components/general/table/LearnerTable";
import {urls} from "../utilities/urls";
import {useGetRecordsFor} from "../customHooks/useGetRecordsFor";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export type SelectExercise = {
    name: string,
    id: string
};

const columnNames: ColumnName[] = [{
    columnName: "Namn",
    propName: "name"
}];

export default function Home() {

    const [exercises, , loading, error] = useGetRecordsFor<SelectExercise>(urls.getExercises);

    useEffect(() => {
        console.log(exercises)
    }, [exercises])

    const navigate = useNavigate();

    const buttonFunctions: FunctionForLearnerTable[] = [
        {
            buttonLabel: "Starta övning",
            tableFunction: function startExercise(id?: string) {
                navigate(`/practice-page/${id}`)
            }
        }
    ];

    const loadingMessage = <div>Hämtar övningar...</div>;
    const errorMessage = <div>Det blev ett fel: {error ? error.message : "no error"}</div>;

    return (
        <>
            <h1>Hem</h1>
            {
                loading ?
                    loadingMessage:
                    error ?
                        errorMessage:
                        <LearnerTable data={exercises} columnNames={columnNames} buttonFunctions={buttonFunctions}/>
            }
        </>
    )
}

