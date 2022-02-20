import styles from './RollText.module.scss'

function RollText({text}){

    return(
        <div className={styles.roll_text} disabled>
            {text && text.split('').map((letter,i) => {
                return letter===' ' ? <h2 key={i} disabled>&nbsp;</h2> : <h2 key={i} disabled>{letter}</h2>
            })}
            
        </div>
    )
}

export default RollText