import React from 'react'

import './Testimony.css'

function testimony (props){

    return(
        <div className='testimony' id={`testimony-${props.id}`}>
            <div className='image'> 
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