import LearnerTable, {ColumnName} from "../general/table/LearnerTable";

export type Result = {
    perFactObjects: FactObjectResult[];
}

export type FactObjectResult = {
    id: string;
    name: string;
    perFacts: factResult[];
}

export type factResult = {
    id: string;
    factObjectId: string;
    givenAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    factName: string
}

type ResultTableData = {
    factObjectName: string,
    id: string,
    factName: string,
    givenAnswer: string,
    correctAnswer: string,
    isCorrect: boolean
}

type ResultTableProps = {
    result: Result;
}

const columnNames: ColumnName[] = [{
    columnName: "Namn",
    propName: "factObjectName",
},{
    columnName: "Fråga",
    propName: "factName"
},
    {
        columnName: "Ditt svar",
        propName: "givenAnswer"
    },
    {
        columnName: "Rätt svar",
        propName: "correctAnswer"
    }
]



export default function ResultTable ({result}: ResultTableProps) {
    let countCorrectAnswer = 0;
    let countIncorrectAnswer = 0;

    result.perFactObjects.forEach(x => {
        x.perFacts.forEach(f =>
            f.isCorrect ?
                countCorrectAnswer++ :
                countIncorrectAnswer++);
    })
    console.log(result)
    const tableData = [];
    for (let i = 0;i < result.perFactObjects.length; i++) {
        let factObjectName = result.perFactObjects[i].name;
        for(let j = 0; j < result.perFactObjects[i].perFacts.length; j++){
            let newTableRow: ResultTableData = {
                factObjectName: "",
                id: "",
                factName: "",
                givenAnswer: "",
                correctAnswer: "",
                isCorrect: false
            };
            if(j === 0){
                newTableRow.factObjectName = factObjectName;
            }
            newTableRow.id = result.perFactObjects[i].perFacts[j].id;
            newTableRow.factName = result.perFactObjects[i].perFacts[j].factName;
            newTableRow.givenAnswer = result.perFactObjects[i].perFacts[j].givenAnswer;
            newTableRow.correctAnswer = result.perFactObjects[i].perFacts[j].correctAnswer;
            newTableRow.isCorrect = result.perFactObjects[i].perFacts[j].isCorrect;
            tableData.push(newTableRow);
        }
    }

    return <>
        <p>Du hade {countCorrectAnswer} svar rätt och {countIncorrectAnswer} svar fel.</p>
        <LearnerTable data={tableData} columnNames={columnNames} buttonFunctions={[]} />
    </>

}
