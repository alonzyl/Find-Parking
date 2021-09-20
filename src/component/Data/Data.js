import { useEffect, useState } from "react";
import React from 'react';
import { render } from "@testing-library/react";





function dataHandler () {
    
    const [data,setData] = useState([""]);
    const [parking,setParking] = useState([""])

    const fetchData = () => {

        //data api from tel aviv datacenter
        fetch('https://gisn.tel-aviv.gov.il/arcgis/rest/services/IView2/MapServer/970/query?where=1%3D1&outFields=*&f=json')
        .then(Response => Response.json())
        .then(newdata =>{
            //handle sucsess
            console.log("sucsess"); 
            setData(newdata.features); 
        })
            //handle error
        .catch((error) => console.log("error"))
    
    }

    const convertData = () => {

    }
}


useEffect( () => {
    
    dataHandler.fetchData();
} , []);


export function GetData ()
{ 
    return (
        <div>
            {
                data!==""?
                console.log(data[1].attributes) 
                :console.log("not working")
             
            }
        </div>
    )
    
}

export default GetData;