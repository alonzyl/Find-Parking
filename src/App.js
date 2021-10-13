import './App.css';
import { useState } from 'react';
import Map from './component/Map/Map';
import NewMap from './component/Map/NewMap'
import SearchBar from './component/Search bar/SearchBar';
import SearchBarNew from './component/Search bar/SearchBarNew';
import DistanceFinder from './component/DistanceFinder/DistanceFinder';
import DirectionMap from './component/Direction Map/DirectionMap';

function App() {
 const [originLocation,SetoriginLocation] = useState({lat: 32.0853, lng: 34.78118})
 const [destinationLocation,SetdestinationLocation] = useState (null)
 const [zoomIn,setZoomIn] = useState(15)
 
 
 //handle data recived from searchbar
 const handleCallBack = (childData) => {
  SetoriginLocation(childData)
  SetdestinationLocation(childData)
  }

  return (
    
    <div className = "holder-app">

      <div className = "searchBar"> 
        {/* <SearchBar parentCallBack={handleCallBack} /> */}
        <SearchBarNew parentCallBack={handleCallBack} />
       

      </div>
      <div className = "map">
        {/* <Map mapPosition = {originLocation}  /> */}
        {/* <NewMap lat = {originLocation.lat} lng = {originLocation.lng} zoomIn = {zoomIn}/> */}
        {/* <DirectionMap /> */}
        <DistanceFinder origin = {originLocation}/>
        {destinationLocation === null || destinationLocation.lat === null ? <NewMap lat = {originLocation.lat} lng = {originLocation.lng} zoomIn = {zoomIn}/> :<DirectionMap />}
        </div>
    </div>
  );
}

export default App;
