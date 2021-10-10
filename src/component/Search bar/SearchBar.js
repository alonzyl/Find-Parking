import './SearchBar.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export function SearchBar(props) {

  const [adress,setAdress] = useState("");
  const [Coordinates,setCorrdinates] = useState({
    lat:null,
    lng:null
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    console.log("loook at meeee",value)
    const latLng = await getLatLng(results[0])
    setAdress(value)
    console.log("this is the latlng",results[0].lat)

    setCorrdinates({
      lat: latLng.lat,
      lng: latLng.lng
    })
    console.log(adress)
  }
 
  useEffect( () => {
     props.parentCallBack(Coordinates) 

  } , [Coordinates]);

  return (
  
    <div className = "holder">
    
    <PlacesAutocomplete 
      value = {adress} 
      onChange = {setAdress} 
      onSelect = {handleSelect}
      className = "searchBar"
      >

    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
      <div>
        <input {...getInputProps({placeholder: "Type adress", className:"searchbar"})} />
        <div> 

          {loading? <div>...loading </div>:null}
            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? "#8ecae6" : "#fff"
              };

              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>);
            })}
        </div>
      </div>
        )}
    </PlacesAutocomplete>
    </div>

  );
} 
  
  export default SearchBar;
  