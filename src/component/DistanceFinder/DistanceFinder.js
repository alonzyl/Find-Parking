/*eslint no-undef: 0*/
import React, { useEffect,useState } from "react";
import * as ParkingData from "../Data/Data.json"; 

export function DistanceFinder(props) {

    const service = new google.maps.DistanceMatrixService();
    let shortestParkingList =[]
    let listOfParking
    const [finalParking,setFinalParking] = useState(null)
    let datalength 

    const handleData = () => {
        datalength = Math.ceil(ParkingData.Parking.length/24) //the length of data separted for fetch
        //list for fetching distance
        for (var i=1; i<=datalength;i++){
             listOfParking = ParkingData.Parking.slice(24*(i-1),i*24)
            for (var j =0;j<listOfParking.length;j++){
                listOfParking[j] = listOfParking[j].Coordinates
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
            // console.log(response.destinationAddresses[index],individualResponse) // for error check print all parkings 
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
        //return closestParkinTemp
        return closestParkinTemp
        }
    }

    const callback = (response, status) => {
        if (status !== "OK") {
            alert(status ,"error");
            return;
        }
        shortestParkingList.push(findShortestForCallBack(response))
        //if finished searching 
        if (shortestParkingList.length === datalength) {
            console.log(shortestParkingList)
            console.log("the adress of the shortest parking is",shortestroute(shortestParkingList))
            convertToGeo(shortestroute(shortestParkingList))
            
        }      
    }

    // convert adress to geo location 
    const convertToGeo =  (adress) => {
      
       ParkingData.Parking.map(park => {
            if (park.Parking_adress_eng === adress.adress)
            {
                setFinalParking(park.Coordinates)
                console.log("the adress is ", adress,"and the eng adress is ", park.Parking_adress_eng,park.Coordinates)
            }
       })
    }
    
    useEffect(() => {
        if (props.origin.lat !== null ) {
            handleData()
        }
    },[props.origin]);

    useEffect(() => {
        if (finalParking){
            console.log("this is the final parking",finalParking)
            props.parentCallBack(finalParking)
        }
    },[finalParking]);

   

    //return fucntion of distanceFinder 
    return  (shortestParkingList)


}

export default DistanceFinder;
