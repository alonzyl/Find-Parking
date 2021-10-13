/*eslint no-undef: 0*/
import React, { Component,useEffect,useState } from "react";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import * as ParkingData from "../Data/Data.json"; 

export function DistanceFinder(props) {

    const service = new google.maps.DistanceMatrixService();
    let shortestParkingList =[]
    let listOfParking
    let FinalParking 
    let datalength

    const handleData = () => {
        
         datalength = Math.ceil(ParkingData.Parking.length/24)
        for (var i=1; i<=datalength;i++){
             listOfParking = []
            for (var j =1;j<=24;j++){
                if (ParkingData.Parking[j*i])
                {
                    listOfParking.push(ParkingData.Parking[j*i].Coordinates) // make a new list for fetching api 
                }
            
            }
            // set destination and origin before fetching
            const matrixOptions = {
                destinations: listOfParking,
                origins: [props.origin],
                travelMode: "WALKING",
            }
            service.getDistanceMatrix(matrixOptions, callback) //fetch api    
        }
    }
    

    const findShortestForCallBack = (response) => {
        
        let minValue ={adress: response.destinationAddresses[0], duration: response.rows[0].elements[0].duration } // the first response 
        
        response.rows[0].elements.map((individualResponse,index) => {
            if (minValue.duration.value>individualResponse.duration.value)
            {
                minValue= {adress:response.destinationAddresses[index], duration:individualResponse.duration}
            }
        })
        return (minValue)
    } 
    
    const shortestroute = (routeOption) => {
        let closestParkinTemp = null

        if (routeOption !== null )
        {
            
            routeOption.map(route => {
                if (closestParkinTemp === null){
                    closestParkinTemp = route
                }
                else if (closestParkinTemp.duration.value > route.duration.value) {
                    closestParkinTemp = route
                }
            })
        
        return closestParkinTemp
    }
}

    function callback(response, status) {
        if (status !== "OK") {
        alert("Error with distance matrix",status);
        return;
        }
        shortestParkingList.push(findShortestForCallBack(response))
        if (shortestParkingList.length === datalength) {
            console.log(shortestParkingList)
            FinalParking = shortestroute(shortestParkingList)
            console.log(FinalParking)
        }
        
    }

    useEffect(() => {
        if (props.origin.lat !== null ) {
            if (props.origin.lat !== 32.0853){
                handleData()
            }
        }
    },[props]);

    useEffect(() => {
        if (FinalParking){
         console.log("we are finished?")
        }
    },[FinalParking]);

   

    //return fucntion of distanceFinder 
    return  (shortestParkingList)


}

export default DistanceFinder;
