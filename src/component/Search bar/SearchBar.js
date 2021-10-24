import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api'; // google maps api 
import DistanceFinder from '../DistanceFinder/DistanceFinder';
import './SearchBar.css';

var autoComplete = null;
export function SearchBar(props) {

  const [destinationLocation,setDestinationLocation] = useState({lat:null,lng:null});  
  const [originLocation,SetoriginLocation] = useState({lat:null,lng:null})
  
  var temp 
  const onLoad = (autocompleteOnLoad) => {
    autoComplete=autocompleteOnLoad
    temp = autocompleteOnLoad
  }
  //handle change of search bar 
  const handleChange = async() => {
    
    setDestinationLocation({
      lat: autoComplete.getPlace().geometry.location.lat(),
      lng: autoComplete.getPlace().geometry.location.lng()
    })
    autoComplete = temp
  }

  // callback to set origin location after calling distance finder
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
      <div>
        <h2>Get Directions:</h2>
      </div>
      <Autocomplete
        onLoad = {onLoad}
        onPlaceChanged = {handleChange}
        options={{
          componentRestrictions: { country: "isr" },
        }}
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
