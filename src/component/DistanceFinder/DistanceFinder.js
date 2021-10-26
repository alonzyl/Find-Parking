/*eslint no-undef: 0*/
import React, { useEffect,useState } from "react";
import * as ParkingData from "../Data/Data.json"; 


//logic functions for distance calculation
export function DistanceFinder(props) {
    
    const [finalParking,setFinalParking] = useState(null);
    const service = new google.maps.DistanceMatrixService();
    let shortestParkingList =[]
    let listOfParking
    let datalength 

    useEffect(() => {
        if (props.origin.lat) {
            handleData()
        }
    },[props.origin]);

    useEffect(() => {
        if (finalParking){
            props.parentCallBack(finalParking)
        }
    },[finalParking]);



    const handleData = () => {
        // Deviding the data to 24 parking lots for each list because api accepts only 24 each time.
        // Fetching api and calling callback to handle the data from the api 

        datalength = Math.ceil(ParkingData.Parking.length/24) //the length of data separated for fetch
        for (var i=1; i<=datalength;i++){
             listOfParking = ParkingData.Parking.slice(24*(i-1),i*24)
            for (var j =0;j<listOfParking.length;j++){
                listOfParking[j] = listOfParking[j].Coordinates
            }
            const matrixOptions = {
                destinations: listOfParking,
                origins: [props.origin],
                travelMode: "WALKING",
            }
            service.getDistanceMatrix(matrixOptions, callback) //fetch api    
        }
    }

    const callback = (response, status) => {
        if (status !== "OK") {
            alert(status ,"error");
            return;
        }
        shortestParkingList.push(findShortestForCallBack(response))

        if (shortestParkingList.length === datalength) { //if finished searching 
            convertToGeo(shortestroute(shortestParkingList))
        }      
    }

    const findShortestForCallBack = (response) => {
        let minValue = {adress: response.destinationAddresses[0], duration: response.rows[0].elements[0].duration} // the first response 
        response.rows[0].elements.map((individualResponse,index) => {
            if (minValue.duration.value>individualResponse.duration.value){
                minValue= {adress:response.destinationAddresses[index], duration:individualResponse.duration}
            }
        })
        return (minValue)
    } 
    
    const shortestroute = (routeOption) => {
        let closestParkingToReturn = null
        if (routeOption){
            routeOption.map(route => {
                if (!closestParkingToReturn){
                    closestParkingToReturn = route
                }
                else if (closestParkingToReturn.duration.value > route.duration.value) {
                    closestParkingToReturn = route
                }
            })
        }
        return closestParkingToReturn
    }

    // convert adress to lat and lng  
    const convertToGeo =  (adress) => {
       ParkingData.Parking.map(park => {
            if (park.Parking_adress_eng === adress.adress) {
                setFinalParking(park.Coordinates)
            }
       })
    }

    return  (null)
}

export default DistanceFinder;
