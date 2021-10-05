import { useEffect, useState } from "react";
import React from 'react';


export function GetData (props) {

    const [data,setData] = useState([]);
    const [parking,setParking] = useState([])
   
   
    //fetch data from telaviv data centerr
    const fetchData = () => {
        fetch('https://gisn.tel-aviv.gov.il/arcgis/rest/services/IView2/MapServer/970/query?where=1%3D1&outFields=*&f=json')
        .then(Response => Response.json())
        .then(newdata =>{
            console.log(newdata);
            setData(newdata.features); 
        })
        .catch((error) => console.log("error fetching data from telaviv center",error))
    }

    
    const handleGeo = (adress) => {
        let adressAfterHandle =adress.replace(/\s/g, '+')
        var finalGeo;

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${adressAfterHandle}&key=AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM`)
            .then(Response => Response.json())
            .then(newdata =>{
                console.log(newdata)
                finalGeo = {lat: newdata.results[0].geometry.location.lat ,lng:newdata.results[0].geometry.location.lng}
                if (finalGeo !== undefined){
                    return finalGeo;
                }
                else {
                    return;
                }               
            })
            .catch((error) => console.log("errorr",error));
       
          
        
    };
    
    const handleData = async() => {

        const parkinglist = [];  

        if (data !== null && data.length > 0){
            for (var i = 0; data.length < i; i++) {
                var park = data[i];
                var parkingLocation = handleGeo(park.attributes.ktovet);
                parkinglist.push({
                    parkingName: park.attributes.shem_chenyon,
                    parkingLocation: parkingLocation,
                    parkingPrice: park.attributes.taarif_yom,
                    parkingOccupied: park.attributes.status_chenyon
                })
            }
            setParking(parkinglist);
            console.log(parking)
        }

        else {
            console.log("error in handeling data")
        }
    }
    


    useEffect( () => {
        //console.log("Parking data is_____",parking)
        props.GetData(parking);
        
    } , [parking]);
    
    useEffect( () => {
         fetchData();
         
    } , []);
    
    useEffect( () => {
        handleData();
    
   } , [data]);
   

    return (
        <div>
          
        </div>
    )

}
//
export default GetData;