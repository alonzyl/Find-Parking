import React from 'react';
import './DirectionsDisplay.css';


const handleData = (data) => {
    let finalData = []
    data.map(handle => { 

        let string = handle.instructions.replace(/\<.*?[^\)]\>/g, '');
        finalData.push(<li><span className="Directions-circle">.</span><a >{string}</a></li>)
    })
    return finalData
}


export function DirectionsDisplay(props) {
    
    let data = handleData(props.directions);
    return (
        <div className = "Directions">
            <h2 className = "DirectionsTitle">Directions: </h2>
            <div className = "info-Directions"> 
                <ul>
                    {data}
                </ul>
            </div>
        </div>  
    )
}
export default DirectionsDisplay;