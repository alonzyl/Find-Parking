import { withScriptjs, withGoogleMap, GoogleMap, Marker ,InfoWindow} from "react-google-maps";
import React, { useEffect, useState } from 'react';
import Data from '../Data/Data'
import * as ParkingData from "../Data/Data.json"


function CreateMap () {
  const [selectedParking, setSelectedParking] = useState(null);
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{lat: 32.0853, lng: 34.78118}}
    >
      {ParkingData.Parking.map(park=>(
      <Marker 
        key={park.Parking_Id} 
        position={park.Coordinates}
        onClick={() => {
            setSelectedParking(park)
        }}
      />
      ))}
      
      {selectedParking && (
      <InfoWindow
        onCloseClick={() => {
          setSelectedParking(null);
        }}
        position={{
          lat: selectedParking.Coordinates.lat,
          lng: selectedParking.Coordinates.lng
        }}
      >
        <div>
          <h1>{selectedParking.Parking_Name}</h1>
          <p> {selectedParking.Parking_Address} </p>
        </div>
      </InfoWindow>
    )}



          {/* {selectedParking && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedParking(null);
          }}
          position={{lat: selectedParking.Coordinates.lat, lng: selectedParking.Coordinates.lng}}
        >
          <div>
            asdf
          </div>
        </InfoWindow>
      )} */}
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(CreateMap));



export function Map () {
   
        
    useEffect( () => {
            console.log('Map!')
        
    } , []);

    
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
                

        </div>
    );
}

export default Map;