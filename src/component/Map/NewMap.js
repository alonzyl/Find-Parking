import React, { useEffect, useState } from 'react'; 
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // google maps api 
import * as ParkingData from "../Data/Data.json" // parking data 

const containerStyle = {
  width: '70vw',
  height: '100vh'
};

const center = {
  lat: 32.0853,
  lng: 34.78118
};

export function NewMap (props) {
   //load google maps api key 
    useEffect( () => {
        <LoadScript
             googleMapsApiKey="AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM">
        </LoadScript>
    } , []);

const addMarker = () => {
 
   
}

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}>
{ /* markers */ }
            <Marker 
            position = {{lat:props.lat, lng:props.lng}}
            />
             </GoogleMap>
    </div>
  )
}

export default React.memo(NewMap);