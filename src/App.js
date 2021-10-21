import './App.css';
import { useState,useEffect } from 'react';
import Map from './component/Map/Map'
import SearchBar from './component/Search bar/SearchBar';
import DirectionsDisplay from './component/Search bar/DirectionsDisplay';
import logo from './logo.png'
function App() {

  const [originLocation,SetoriginLocation] = useState({lat:null,lng:null})
  const [destinationLocation,SetdestinationLocation] = useState ({lat:null,lng:null})
  const [directions,setDirections ] = useState (null)

 //for handling search bar changes
  const handleCallBack= (childData) => {
    SetoriginLocation(childData.origin)
    SetdestinationLocation(childData.destination)
  }

  const handleDirectionsCallBack = (childData) => {
    setDirections(childData)
  }

  
    return (
    
      <div className = "holder-app">
        <div className = "NavigationBar">
          <img src = {logo}/>
        </div>
        <div className = "searchBar"> 
         <SearchBar parentCallBack={handleCallBack} />
         <div className= "DirectionsDisplay">
          {directions!==null? <DirectionsDisplay  directions = {directions}/>:null}
         </div>
        </div>
        <div className = "map">
          <Map origin = {originLocation} destination={destinationLocation} directionsCallBack = {handleDirectionsCallBack} /> 
        </div>
      </div>
    );
  
  
  
}


export default App;