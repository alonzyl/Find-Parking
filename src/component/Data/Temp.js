/*eslint no-undef: 0*/
import React, { useEffect, useState } from 'react';
import * as ParkingData from "./Data.json"; 

export function Temp() {


    const service = new google.maps.DistanceMatrixService();
    const handleData = () => {

        const center = {







            "lat":32.087245 , "lng": 34.773730







            
        
        
        
        
        
        
        
        
        
        
        }


        
    const matrixOptions = {
        destinations: [{lat:32.089541 , lng:34.779882 }],



        origins: [center],



        travelMode: "WALKING",
    }
    service.getDistanceMatrix(matrixOptions, callback) //fetch api    
}

    const callback = (response, status) => {
            if (status !== "OK") {
                alert(status ,"error");
                return;
            }
            console.log("________________________")
            console.log(response)
            console.log("________________________")

            //if finished searching 
        }


    return (
        <div>
            
        {handleData()}
        </div>
    )
}

export default Temp;
