import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { useEffect } from 'react';
import Data from '../Data/Data'

var dataList = [];

 function getData (dataRecived) {
    //get data from data page

    dataList=dataRecived;
    
    console.log("sucsess passing data",dataList);
    console.log(dataRecived);
}

function createMap () {
    
    return (
        <GoogleMap
        defaultZoom={14}
        defaultCenter={{lat: 32.0853, lng: 34.78118}}
        >
        
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(createMap));



export function Map () {
   
        
    useEffect( () => {
            
        
    } , []);

    useEffect( () => {
            
        console.log("print when data was updated",dataList)    
    } , [dataList]);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
                <Data GetData={getData} />

        </div>
    );
}

export default Map;