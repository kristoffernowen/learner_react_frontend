import {ComponentPropsWithoutRef, ReactNode} from "react";
import styles from "./GrayBorderedBox.module.css"

type GrayBorderedTransparentBoxProps = {
    children: ReactNode;
} & ComponentPropsWithoutRef<"div">

export default function GrayBorderedBox({children}: GrayBorderedTransparentBoxProps) {

    return <div className={styles.grayBox}>
        {children}
    </div>
}
