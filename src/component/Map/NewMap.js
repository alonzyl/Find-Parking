import React, { useEffect, useState } from 'react'; 
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'; // google maps api 
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
    const [selectedParking, setSelectedParking] = useState(null);
 


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
                zoom={14}>
            
            { ParkingData.Parking.map(parkign => (
                <Marker 
                    key= {parkign.Parking_Id}
                    position={{                     
                        lat: parkign.Coordinates.lat,                     
                        lng: parkign.Coordinates.lng 
                    }}
                    onClick={() => {
                        setSelectedParking(parkign);
                        console.log(selectedParking)
                     }}
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
             </GoogleMap>
    </div>
  )
}

export default React.memo(NewMap);