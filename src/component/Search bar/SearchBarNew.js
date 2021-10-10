import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow,Autocomplete } from '@react-google-maps/api'; // google maps api 

export function SearchBarNew(props) {

const [Coordinates,setCorrdinates] = useState({lat:null,lng:null});  
var autoComplete = null;
var renewAutoComplete = null;
const onLoad = (autocompleteOnLoad) => {
  autoComplete=autocompleteOnLoad
  // renewAutoComplete = autocompleteOnLoad
}

const handleChange = async(value) => {
  console.log("the auto complete is",autoComplete)
  setCorrdinates({
    lat: autoComplete.getPlace().geometry.location.lat(),
    lng: autoComplete.getPlace().geometry.location.lng()
  })
}

useEffect(() => {
	props.parentCallBack(Coordinates)
},[Coordinates]);

return (    
  <div>
    <Autocomplete
      onLoad = {onLoad}
      onPlaceChanged = {handleChange}
    >
    <input  
        type="text"
        placeholder="Enter destination location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `350px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "3%",
          top:"3%",
          background:"white"
        }}
      />
    </Autocomplete>
  </div>
)
}
export default SearchBarNew;
