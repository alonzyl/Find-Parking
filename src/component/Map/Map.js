import React, { useEffect, useState } from 'react'; 
import './Map.css';
import { GoogleMap, LoadScript, Marker, InfoWindow,DirectionsService,DirectionsRenderer } from '@react-google-maps/api'; // google maps api 
import * as ParkingData from "../Data/Data.json" // parking data 
import { render } from '@testing-library/react';
import ahozLogo from "./ahozLogo.jpg"
import markerLogo from './ParkingIcon.png'
import startingIcon from './startingIcon.png'


export function Map (props) {
  
    const [selectedParking, setSelectedParking] = useState(null); // selected marker in map
    const [responsee,setResponse] = useState()

     //load google maps api key 
     useEffect( () => {
        <LoadScript
             googleMapsApiKey="AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM">
        </LoadScript>
    },[]);

    useEffect( () => {
        //when destination is changed
        render(
            <DirectionsService
            options={{ 
            destination: props.destination,
            origin: props.origin,
            travelMode: "WALKING"
            }} 
            callback={directionsCallback}
            />
        )
    },[props.destination]);
   
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                props.directionsCallBack(response.routes[0].legs[0].steps)
                setResponse(response)                
            } else {
              console.log('response error: ', response)
            }
        }
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={{
                    width: '70vw',
                    height: '95vh'
                  }}
                center={{
                    lat: 32.0853,
                    lng: 34.78118
                  }}
                zoom={15}>
            {/* set marker for all parking */}
            {ParkingData.Parking.map(parkign => (
                <Marker 
                    key= {parkign.Parking_Id}
                    icon = {markerLogo}
                    position={{                     
                        lat: parkign.Coordinates.lat,                     
                        lng: parkign.Coordinates.lng 
                    }}
                    onClick={() => {
                        setSelectedParking(parkign);
                     }}
                    visible = {true}
                 />
            ))}
            {selectedParking &&(
                // info window when selecting marker parking
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedParking(null);
                    }}
                    position={{
                        lat: selectedParking.Coordinates.lat,
                        lng: selectedParking.Coordinates.lng
                    }}>
                    <div className  = "infoWindow">
                        <img src = {ahozLogo} alt = "ahozat ahof logo"/>
                        <div className = "infoSection"> 
                            <h2>חניון {selectedParking.Parking_Name}</h2>
                            <h4>כתובת: {selectedParking.Parking_Address}</h4>
                            <p>{selectedParking.Parking_Cost}</p>
                        </div>
                    </div>
                </InfoWindow>
            )}
            {responsee != null && (
                <DirectionsRenderer
                    options={{ 
                        directions: responsee,
                        markerOptions: { icon: startingIcon },
                    }}
                />
            )}
            </GoogleMap>
    </div>
  )}
export default Map;