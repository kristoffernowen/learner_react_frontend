import styles from "./LiToAdd.module.css"

type LiToAddProps = {
    name: string;
    removeItem: (name: string) => void;
}

export default function LiToAdd({name, removeItem}: LiToAddProps){

    return (<li
        key={name}
        className={styles.liToAdd}
    >
        <div>
            <p>{name}</p>
            <button
                type="button"
                onClick={() => removeItem(name)}
            >Ta bort</button>
        </div>
    </li>)
}
