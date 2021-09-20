import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from 'react';


function Smap () {
    return (
        <GoogleMap
        defaultZoom={14}
        defaultCenter={{lat: 32.0853, lng: 34.7818}}
        >
        <Marker 
        key = {1}
        position= {{lat: 32.0853, lng: 34.7818}}
        />
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Smap));
export function Map () {
   
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