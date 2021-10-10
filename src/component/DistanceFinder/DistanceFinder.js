/*eslint no-undef: 0*/
import React, { Component,useEffect,useState } from "react";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import * as ParkingData from "../Data/Data.json"; 

export function DistanceFinder() {
const [distancefinder,setDistancefinder] = useState()
let destinationList = [
    {lat: 32.089541, lng: 34.779882} ,
    {lat: 32.079533, lng: 34.771557} ,
    {lat: 32.111255, lng: 34.841524} ,
    {lat: 32.0772819519043, lng: 34.78434753417969} ,
    {lat: 32.077888, lng: 34.796703} ,
    {lat: 32.096025, lng: 34.777732} ,
    {lat: 32.085064, lng: 34.790688} ,
    {lat: 32.076847, lng: 34.768681} ,
    {lat: 32.117507, lng: 34.806859} ,
    {lat: 32.1030853, lng: 34.7943149} ,
    {lat: 32.1136168, lng: 34.8074392} ,
    {lat: 32.082926, lng: 34.794942} ,
    {lat: 32.0933914, lng: 34.7778347} ,
    {lat: 32.08088, lng: 34.78057} ,
    {lat: 32.0741021, lng: 34.7839976} ,
    {lat: 32.064643, lng: 34.791972} ,
    {lat: 32.057122, lng: 34.757719} ,
    {lat: 32.1089801, lng: 34.8401937} ,
    {lat: 32.1101137, lng: 34.838261} ,
    {lat: 32.072836, lng: 34.783428} ,
    {lat: 32.0601806640625, lng: 34.7838249206543} ,
    {lat: 32.060558, lng: 34.782629} ,
    {lat: 32.1058321, lng: 34.8014886} ,
    {lat: 32.1181563, lng: 34.8016537} ,
    {lat: 32.1181563, lng: 34.8016537} ,


 
    
    ]
let response 
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

const myPromise = new Promise(function(Resolve, Reject) {

    // ParkingData.Parking.map(parking => (
    //     destinationList.push({lat: parking.Coordinates.lat, lng: parking.Coordinates.lng})
    // ))
    if (ParkingData.Parking.length > destinationList.length){
        Resolve(destinationList); // when successful
    }
    else {
        Reject("promise error, list length is not the same");  // when error
    }
    })


useEffect(() => {
	myPromise
    .then(result =>{ 
        setDistancefinder(result)
    })
    .catch(error => console.log(error))
  
},[]);

useEffect(() => {
    // console.log("the hook is",distancefinder)
},[destinationList]);



    //return fucntion of distanceFinder 
    return (
        <div>

            {distancefinder?(
                <DistanceMatrixService
                options={{
                destinations: destinationList,
                origins: [{ lat: 32.062867, lng: 34.763709 }],
                travelMode: "WALKING",
                }}
                callback={(res) => {
                console.log("RESPONSE", res);  
                }}
                />
            ):(null)}




     
        </div>
    )
}

 

export default DistanceFinder;
