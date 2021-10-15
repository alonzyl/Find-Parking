import './App.css';
import { useState,useEffect } from 'react';
import Map from './component/Map/Map';
import NewMap from './component/Map/NewMap'
import SearchBar from './component/Search bar/SearchBar';
import DistanceFinder from './component/DistanceFinder/DistanceFinder';
import DirectionMap from './component/Direction Map/DirectionMap';
import geogeo, { getgeo } from './component/Data/FetchGeoLocation'


function App() {

  const [originLocation,SetoriginLocation] = useState({lat:null,lng:null})
  const [destinationLocation,SetdestinationLocation] = useState ({lat:null,lng:null})
  const [zoomIn,setZoomIn] = useState(15)
  const [test,settest] = useState()

 //for handling search bar changes
  const handleCallBack= (childData) => {
    SetoriginLocation(childData.origin)
    SetdestinationLocation(childData.destination)
    console.log("the origin is ", childData.origin , "the destination is " , childData.destination , "from main")
   
  }

  
    return (
    
      <div className = "holder-app">
        
        <div className = "searchBar"> 
         <SearchBar parentCallBack={handleCallBack} />
         
        </div>
        <div className = "map">
          {originLocation.lat === null?<NewMap lat = {32.0853} lng = {34.78118} zoomIn = {zoomIn} /> : < DirectionMap origin = {originLocation} destination={destinationLocation}/>}
         
        </div>
      </div>
    );
  
  
  
}


export default App;