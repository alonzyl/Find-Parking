import { useEffect, useState } from "react";
import React from 'react';


export function GetData () {

    const [data,setData] = useState([""]);
    const [parking,setParking] = useState([""])
    //fetch data from telaviv data center
    const fetchData = () => {

        console.log("effect hook");
        fetch('https://gisn.tel-aviv.gov.il/arcgis/rest/services/IView2/MapServer/970/query?where=1%3D1&outFields=*&f=json')
        .then(Response => Response.json())
        .then(newdata =>{
            console.log("sucsess"); 
            setData(newdata.features); 
            console.log(newdata)
        })
        .catch((error) => console.log("error"))

        
    }
    useEffect( () => {
        
        fetchData();
    } , []);


    
    return (
        <div>
        </div>
    )
    
};

export default GetData;