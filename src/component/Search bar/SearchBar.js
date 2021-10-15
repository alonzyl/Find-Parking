import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api'; // google maps api 
import './SearchBar.css';
import DistanceFinder from '../DistanceFinder/DistanceFinder';

export function SearchBar(props) {

  const [destinationLocation,setDestinationLocation] = useState({lat:null,lng:null});  
  const [originLocation,SetoriginLocation] = useState({lat:null,lng:null})
  var autoComplete = null;

  const onLoad = (autocompleteOnLoad) => {
    autoComplete=autocompleteOnLoad
  }

  const handleChange = async(value) => {
    setDestinationLocation({
      lat: autoComplete.getPlace().geometry.location.lat(),
      lng: autoComplete.getPlace().geometry.location.lng()
    })
  }

  const handleCallBackOrigin = (childData) => {
    SetoriginLocation(childData)
  }

  
  //call back to parent to set the destination and the origin 
  useEffect(() => {
    if (originLocation.lat !== null){
      props.parentCallBack({origin: originLocation , destination:destinationLocation})
    }
  },[originLocation]);


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

      {destinationLocation.lat !== null? <DistanceFinder origin = {destinationLocation} parentCallBack = {handleCallBackOrigin}  />:null}
    </div>
  )
}
export default SearchBar;
