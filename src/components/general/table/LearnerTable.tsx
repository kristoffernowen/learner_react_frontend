
import validateTableDataAndColumns from "../../../functions/validateTableDataAndColumns";
import {ReactNode, useEffect, useState} from "react";
import styles from "./LearnerTable.module.css"

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

    function htmlTdWithProperStyling(columnName: ColumnName, rowData: DataWithId, columnIndex: number): ReactNode {
        if(columnName.propName === "givenAnswer"){
            return <td
             className={rowData["isCorrect"] ? styles.rightAnswer : styles.wrongAnswer}
             key={columnIndex}
            >
                {rowData[columnName.propName]}
            </td>
        } else {
            return <td>{rowData[columnName.propName]}</td>
        }
    }

    return (
        <>
            {
                tableInputIsValid ?
                    <table
                        className={styles.learnerTable}
                    >
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
                                <tr
                                    key={rowIndex}
                                >
                                    {
                                        columnNames.map((columnName, columnIndex) => (
                                            htmlTdWithProperStyling(columnName, rowData, columnIndex)
                                        ))
                                    }
                                    {
                                        buttonFunctions.map((buttonFunction)=> (
                                            <td
                                                key={buttonFunction.buttonLabel}
                                            >
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
