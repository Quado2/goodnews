import React from 'react'

import styles from './Testimony.module.css'

function testimony (props){

    return(
        <div className={styles.testimony} id={`${styles[`testimony-${props.id}`]}`}>
            <div className={styles.image}> 
                <img src={props.image} alt=';' />
                <h2>{props.mName}</h2>
            </div>
            <div>
                <p>{'" '+props.testimony +' "'}</p>
            </div>
        </div>
    )
}

export default testimony