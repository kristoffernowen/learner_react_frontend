import {ColumnName} from "../components/general/table/LearnerTable";

export default function validateTableDataAndColumns(data: any[], columnNames: ColumnName[]): boolean {

    const dataProperties = data.reduce<string[]>((accumulator, currentElement) => {
        Object.keys(currentElement).forEach(key => {
            if(!accumulator.includes(key)){
                accumulator.push(key);
            }
        });
        return accumulator;
    }, []);

    return columnNames.every(columnName => dataProperties.includes(columnName.propName));
}
