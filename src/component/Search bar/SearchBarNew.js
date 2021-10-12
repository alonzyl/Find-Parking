import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api'; // google maps api 

export function SearchBarNew(props) {

const [Coordinates,setCorrdinates] = useState({lat:null,lng:null});  
var autoComplete = null;

const onLoad = (autocompleteOnLoad) => {
  autoComplete=autocompleteOnLoad
}

const handleChange = async(value) => {
  setCorrdinates({
    lat: autoComplete.getPlace().geometry.location.lat(),
    lng: autoComplete.getPlace().geometry.location.lng()
  })
}

useEffect(() => {
	props.parentCallBack(Coordinates)
},[Coordinates]);

return (    
  <div >
    <Autocomplete
      onLoad = {onLoad}
      onPlaceChanged = {handleChange}
    >
    <input  
        type="text"
        className = "destinationInput"
        placeholder="Enter destination location"
      />
    </Autocomplete>
  </div>
)
}
export default SearchBarNew;
