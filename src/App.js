import './App.css';
import Map from './component/Map/Map';
import Data from './component/Data/Data';
import NewMap from './component/Map/NewMap'
import SearchBar from './component/Search bar/SearchBar';
import SearchBarNew from './component/Search bar/SearchBarNew';
import { useState } from 'react';



function App() {
 const [mapGeoLocation,setmapGeoLocation] = useState({lat: 32.0853, lng: 34.78118})
 const [zoomIn,setZoomIn] = useState(14)
 //handle data recived from searchbar

 const handleCallBack = (childData) => {
    setmapGeoLocation(childData)
  }

  return (
    
    <div className = "holder-app">

      <div className = "searchBar"> 
        {/* <SearchBar parentCallBack={handleCallBack} /> */}
        <SearchBarNew parentCallBack={handleCallBack} />
      </div>
      <div className = "map">
        {/* <Map mapPosition = {mapGeoLocation}  /> */}
        <NewMap lat = {mapGeoLocation.lat} lng = {mapGeoLocation.lng} zoomIn = {zoomIn}/>
        </div>
    </div>
  );
}

export default App;
