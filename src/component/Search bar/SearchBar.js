import './SearchBar.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export function SearchBar() {
  const [adress,setAdress] = useState("");
  const [Coordinates,setCorrdinates] = useState({
    lat:null,
    lng:null
  });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAdress(value)
    setCorrdinates({
      lat: latLng.lat,
      lng: latLng.lng
    })
    console.log(adress)
  }
 

  return (
  
    <div className = "holder">
    
    <PlacesAutocomplete 
      value = {adress} 
      onChange = {setAdress} 
      onSelect = {handleSelect}
      >

      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <div>

          <input {...getInputProps({placeholder: "Type adress"})} />

          <div> 
            {loading? <div>...loading </div>:null}

            
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#8ecae6" : "#fff"
                };

                return (
                 
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
          </div>
        </div>
        
        )}
    </PlacesAutocomplete>







      {/* <input type="text" placeholder="Location to" className = "searchBar-to"/> */}

    </div>

  );
} 
  
  export default SearchBar;
  