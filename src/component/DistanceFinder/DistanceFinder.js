/*eslint no-undef: 0*/
import React, { Component,useEffect,useState } from "react";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import * as ParkingData from "../Data/Data.json"; 

export function DistanceFinder() {

    const service = new google.maps.DistanceMatrixService();
    let listOfParking 
    let shortestParkingList =[]
    let closestParking
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
            const matrixOptions = {
                destinations: listOfParking,
                origins: [{ lat: 32.062867, lng: 34.763709 }],
                travelMode: "WALKING",
            }
            service.getDistanceMatrix(matrixOptions, callback)            
        }

    }
    
   

    const findShortestForCallBack = (response) => {
        let minValue ={adress: response.destinationAddresses[0], duration: response.rows[0].elements[0].duration } // the first response 
        
        response.rows[0].elements.map((individualResponse,index) => {
            console.log(index)
            if (minValue.duration.value>individualResponse.duration.value)
            {
                minValue= {adress:response.destinationAddresses[index], duration:individualResponse.duration}
            }
        })
        

        
        return (minValue)
    }
    

    function callback(response, status) {
        if (status !== "OK") {
        alert("Error with distance matrix");
        return;
        }
        shortestParkingList.push(findShortestForCallBack(response))
        console.log("the shortest list is",shortestParkingList)
    }

    useEffect(() => {
	    handleData()
    },[]);

   

    //return fucntion of distanceFinder 
    return  (shortestParkingList)


}

export default DistanceFinder;
