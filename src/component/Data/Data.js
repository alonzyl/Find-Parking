import { useEffect, useState } from "react";
import React from 'react';
import handleCoordinate, { handlePoint } from './handleCoordinate'

export function GetData (props) {

    const [data,setData] = useState([]);
    const [parking,setParking] = useState([])
    
    //fetch data from telaviv data center
    const fetchData = () => {
        fetch('https://gisn.tel-aviv.gov.il/arcgis/rest/services/IView2/MapServer/970/query?where=1%3D1&outFields=*&f=json')
        .then(Response => Response.json())
        .then(newdata =>{
            //console.log("sucsess"); 
            setData(newdata.features); 
            handleData();
            console.log("the raw data is____",newdata)
        })
        .catch((error) => console.log("errorr"))
    }

    const handleData = async() => {

        const parkinglist = [];
        var parkingToAdd ={};
       

        if (data.length > 0){// data.length < 1
            data.map((park) =>{
                parkingToAdd =
                parkinglist.push({
                    parkingName: park.attributes.shem_chenyon,
                    parkingLocation: {lat: park.geometry.x, lng: park.geometry.y},
                    parkingPrice: park.attributes.taarif_yom,
                    parkingOccupied: park.attributes.status_chenyon
                })  
            })
            setParking(parkinglist);
        }
        else {
            console.log("data handle errorr")
        }
    }

    useEffect( () => {
        //console.log("Parking data is_____",parking)
        props.GetData(parking);
        
    } , [parking]);

    
     useEffect( () => {
         fetchData();
         
     } , []);
    
    
    return (
        <div>
            {handlePoint("דובנוב 4 תל אביב יפו")}
        </div>
    )
    
};

export default GetData;