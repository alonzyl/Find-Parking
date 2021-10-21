import React, { useEffect, useState } from 'react';
import './DirectionsDisplay.css';


const handleData = (data) => {
    let finalData = []
    data.map(handle => { 
        let string
        string = handle.instructions.replace(/\<.*?[^\)]\>/g, '');
        finalData.push(string)

    })
    return finalData
}


export function DirectionsDisplay(props) {
    
    let data = handleData(props.directions);

    const list = 
        data.map ((item,index) => {

            <li><span class="Directions-circle">.</span><a >{item}</a></li>
        })
    

    return (
        <div className = "Directions">
            <h2 >Directions</h2>
            <div className = "info-Directions"> 
                <ul>
                    {list}
                </ul>
            </div>
        
         


        </div>
    )
}

export default DirectionsDisplay;
