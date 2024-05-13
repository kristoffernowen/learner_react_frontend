import {ReactNode} from "react";
import styles from "./UlToAdd.module.css"

type ListItemsToAddProps = {
    children: ReactNode;
}

export default function UlToAdd({children}: ListItemsToAddProps){

    return <ul className={styles.ul}>
        {children}
    </ul>
}
