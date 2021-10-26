import React from 'react';
import './DirectionsDisplay.css';
import { RiDirectionFill } from "react-icons/ri";


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
            <h2 className = "DirectionsTitle"><RiDirectionFill className = "directionIcon" />Directions: </h2>
            <p>The walking directions to your destination are</p>
            <div className = "info-Directions"> 
                <ul>
                    {data}
                </ul>
            </div>
        </div>  
    )
}
export default DirectionsDisplay;