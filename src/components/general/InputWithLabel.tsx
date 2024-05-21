import {ChangeEvent, ComponentPropsWithoutRef} from "react";
import styles from "../general/InputWithLabel.module.css"

type InputDivProps = {
    label: string;
    id: string;
    value: string;
    handleInputChange: (
        event: ChangeEvent<HTMLInputElement>,
        id: string) => void;
} & ComponentPropsWithoutRef<"input">

export default function InputWithLabel({
                                           label,
                                           id,
                                           value,
                                           handleInputChange,
                                           ...props
                                       }: InputDivProps) {



    return <div
        className={styles.topDiv}
    >
        <label
            className={styles.borderRadius}
            htmlFor={id}
        >
            {label}
        </label>
        <input
            {...props}
            className={styles.input}
            id={id}
            type="text"
            value={value}
            onChange={(event) => handleInputChange(event, id)}
        />
    </div>
}
