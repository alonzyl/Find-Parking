import React, { useEffect, useState } from 'react'; 
import { GoogleMap, LoadScript, Marker, InfoWindow,DirectionsService,DirectionsRenderer } from '@react-google-maps/api'; // google maps api 
import * as ParkingData from "../Data/Data.json" // parking data 

const containerStyle = {
  width: '70vw',
  height: '100vh'
};

let passThrouge = true

export function Map (props) {
  
    const [selectedParking, setSelectedParking] = useState(null);
    const [responsee,setResponse] = useState()

    
    const destination = {
        lat: 32.111255,
        lng: 34.841524
    }
    const center = {
        lat: 32.0853,
        lng: 34.78118
      }

    const directionsCallback = (response) => {

        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response)
                passThrouge = false
            } else {
              console.log('response: ', response)
            }
        }
    }
    const callDiriction = () => {

        if (passThrouge === true){
            return (
                <DirectionsService
                    options={{ 
                    destination: destination,
                    origin: center,
                    travelMode: "WALKING"
                    }} 
                    callback={directionsCallback}
                />
            )
        }
        else {
            console.log("inside else")
        }
    }
    //load google maps api key 
    useEffect( () => {
        <LoadScript
             googleMapsApiKey="AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM">
        </LoadScript>
    } , []);

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
                    <div>
                        <h2>{selectedParking.Parking_Name}</h2>
                        <h4>{selectedParking.Parking_Address}</h4>
                    </div>
                </InfoWindow>
                )}
            {
               callDiriction()
            }
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