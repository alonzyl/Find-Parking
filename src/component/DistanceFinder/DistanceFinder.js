/*eslint no-undef: 0*/
import React, { Component,useEffect,useState } from "react";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import * as ParkingData from "../Data/Data.json"; 

     // <DistanceMatrixService
    //             options={{
    //             destinations: destinationListarr,
    //             origins: [{ lat: 32.062867, lng: 34.763709 }],
    //             travelMode: "WALKING",
    //             }}
    //             callback={(res) => {
    //             console.log("RESPONSE", res);  
    //             }}
    // /> 
export function DistanceFinder() {

    const service = new google.maps.DistanceMatrixService();
    let listOfParking 

    const handleData = () => {
        var datalength = Math.ceil(ParkingData.Parking.length/24) 
        
        for (var i=1; i<=datalength;i++){
            listOfParking = []
            
            for (var j =1;j<=24;j++){
                if (ParkingData.Parking[j*i])
                {
                    listOfParking.push(ParkingData.Parking[j*i].Coordinates)
                }
            }

            
        }
    }
    handleData()
    const matrixOptions = {
        destinations: listOfParking,
        origins: [{ lat: 32.062867, lng: 34.763709 }],
        travelMode: "WALKING",
    }
    service.getDistanceMatrix(matrixOptions, callback)


    const findShortest = (response) => {
       let minValue =response.elements[0] // the first response 
       
        response.elements.map(individualResponse => {
            if (minValue.duration.value>individualResponse.duration.value)
            {
                minValue=individualResponse
            }
        })
        return (minValue)
        console.log("the shortest value ",minValue)
    }
    

    function callback(response, status) {
        if (status !== "OK") {
        alert("Error with distance matrix");
        return;
        }
        findShortest(response.rows[0])
        //console.log(response.rows[0].elements[2].duration.value);        
    }


    //return fucntion of distanceFinder 
    return (
        <div>
            {handleData()}
        </div>
    )
}

 

export default DistanceFinder;
