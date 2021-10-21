import React, { useEffect, useState } from 'react'; 
import './Map.css';
import { GoogleMap, LoadScript, Marker, InfoWindow,DirectionsService,DirectionsRenderer } from '@react-google-maps/api'; // google maps api 
import * as ParkingData from "../Data/Data.json" // parking data 
import { render } from '@testing-library/react';
import logo from "./img.jpg"

const containerStyle = {
  width: '70vw',
  height: '95vh'
}
const center = {
    lat: 32.0853,
    lng: 34.78118
  }

let passThrouge = true

export function Map (props) {
  
    const [selectedParking, setSelectedParking] = useState(null); // selected marker in map
    const [responsee,setResponse] = useState()

   
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                props.directionsCallBack(response.routes[0].legs[0].steps)
                setResponse(response)
                passThrouge = false
                
            } else {
              console.log('response: ', response)
            }
        }
    }
   
    //load google maps api key 
    useEffect( () => {
        <LoadScript
             googleMapsApiKey="AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM">
        </LoadScript>
    } , []);

    useEffect( () => {
        render (
           
                <DirectionsService
                options={{ 
                destination: props.destination,
                origin: props.origin,
                travelMode: "WALKING"
                }} 
                callback={directionsCallback}
            />
        )
    } , [props.destination]);

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}>
            
            { ParkingData.Parking.map(parkign => (
                <Marker 
                    key= {parkign.Parking_Id}
                    
                    position={{                     
                        lat: parkign.Coordinates.lat,                     
                        lng: parkign.Coordinates.lng 
                    }}
                    onClick={() => {
                        setSelectedParking(parkign);
                     }}
                     visible = {true}
                 />
            ))
            }
            {selectedParking && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedParking(null);
                    }}
                    position={{
                        lat: selectedParking.Coordinates.lat,
                        lng: selectedParking.Coordinates.lng
                    }}>
                    <div className  = "infoWindow">
                        <img src = {logo}/>
                        <h2>חניון {selectedParking.Parking_Name}</h2>
                        <h4>כתובת: {selectedParking.Parking_Address}</h4>
                        <p>{selectedParking.Parking_Cost}</p>
                    </div>
                </InfoWindow>
                )}
            
             {
            responsee != null && (
            <DirectionsRenderer
              options={{ 
                directions: responsee
              }}
                />
            )
          }
             </GoogleMap>
    </div>
  )
}

export default Map;