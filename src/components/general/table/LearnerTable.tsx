
import validateTableDataAndColumns from "../../../functions/validateTableDataAndColumns";
import {useEffect, useState} from "react";

type LearnerTableProps = {
    data: DataWithId[];
    columnNames: ColumnName[];
    buttonFunctions: FunctionForLearnerTable[];
}

type DataWithId = {
    id: string;
    [key: string]: any;
}

export type ColumnName = {
    propName: string;
    columnName: string;
}

export type FunctionForLearnerTable = {
    tableFunction: (id?:string) => void;
    buttonLabel: string;
}

export default function LearnerTable({data, columnNames, buttonFunctions}: LearnerTableProps) {

    const [tableInputIsValid, setTableInputIsValid] = useState(true);

    useEffect(() => {
        const isValid = validateTableDataAndColumns(data, columnNames);
        if(!isValid && data.length !== 0) {
            console.log("bad table data");
            setTableInputIsValid(false);
        }
    }, [data, columnNames])

    return (
        <>
            {
                tableInputIsValid ?
                    <table>
                        <thead>
                        <tr>
                            {columnNames.map((columnName, index) => (
                                <th
                                    key={index}
                                >{columnName.columnName}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((rowData, rowIndex) => (
                                <tr key={rowIndex} >
                                    {
                                        columnNames.map((columnName, columnIndex) => (
                                            <td key={columnIndex}>{rowData[columnName.propName]}</td>
                                        ))
                                    }
                                    {
                                        buttonFunctions.map((buttonFunction)=> (
                                            <td key={buttonFunction.buttonLabel}>
                                                <button
                                                    onClick={() => {
                                                        buttonFunction.tableFunction(rowData.id)
                                                    }}
                                                >
                                                    {buttonFunction.buttonLabel}
                                                </button>
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                        </tbody>
                    </table> :
                    <div>
                        Det är något fel på tabellen
                    </div>
            }
        </>
    )
}
