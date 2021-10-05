import './App.css';
import Map from './component/Map/Map';
import Data from './component/Data/Data';
import SearchBar from './component/Search bar/SearchBar'
import { useState } from 'react';



function App() {
 const [mapGeoLocation,setmapGeoLocation] = useState({lat: 32.0853, lng: 34.78118})
 
  const handleCallBack = (childData) => {
    setmapGeoLocation(childData)
  }

  return (

    <div className = "holder-app">
      <div className = "searchBar"> 
        <SearchBar parentCallBack={handleCallBack} />
        
      </div>
      <div className = "map">
        <Map mapPosition = {mapGeoLocation}  />
        </div>
        
    </div>

  );
}

export default App;
