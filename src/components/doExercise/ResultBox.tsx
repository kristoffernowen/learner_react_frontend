import styles from "./ResultBox.module.css";

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

type ResultProps = {
    result: Result;
}

export default function ResultBox({result}: ResultProps) {

    let countCorrectAnswer = 0;
    let countIncorrectAnswer = 0;

    result.perFactObjects.forEach(x => {
        x.perFacts.forEach(f =>
            f.isCorrect ?
                countCorrectAnswer++ :
                countIncorrectAnswer++);
    })

    return <>
        <p>Du hade {countCorrectAnswer} rätt och {countIncorrectAnswer} fel.</p>
        {result.perFactObjects.map((fo => <div
                className={styles.factObjectDiv}
                key={fo.id}
            >
                <strong><p>{fo.name}</p></strong>
                {fo.perFacts.map(f => <div
                    className={styles.fact}
                    key={f.id}
                >
                    <p>{f.factName}</p>
                    <div className={styles.answerDiv}>
                        <span> Ditt svar: </span>
                        <span
                            className={f.isCorrect ? styles.correctAnswer : styles.inCorrectAnswer}>{f.givenAnswer} </span>
                    </div>
                    <div className={styles.answerDiv}>
                        <span>Rätt svar: </span>
                        <span>{f.correctAnswer}</span>
                    </div>
                </div>)}
            </div>
        ))}
    </>
}
