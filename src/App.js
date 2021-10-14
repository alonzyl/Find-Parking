import './App.css';
import { useState,useEffect } from 'react';
import Map from './component/Map/Map';
import NewMap from './component/Map/NewMap'
import SearchBar from './component/Search bar/SearchBar';
import SearchBarNew from './component/Search bar/SearchBarNew';
import DistanceFinder from './component/DistanceFinder/DistanceFinder';
import DirectionMap from './component/Direction Map/DirectionMap';
import geogeo, { getgeo } from './component/Data/FetchGeoLocation'


function App() {

 const [originLocation,SetoriginLocation] = useState({lat: 32.0853, lng: 34.78118})
 const [destinationLocation,SetdestinationLocation] = useState (null)
 const [zoomIn,setZoomIn] = useState(15)
 const [test,settest] = useState()
 let temp
 
 //handle data recived from searchbar
 const handleCallBackDestination = (childData) => {
   if (childData.lat !== null) {
    SetdestinationLocation(childData)

   }
  }

  const handleCallBackOrigin = (childData) => {
    
    if (childData.lat !== null) {
      SetoriginLocation(childData)
    }

  }
  useEffect(() => {
    console.log("from app testi test test", destinationLocation) 
    // console.log(getgeo(destinationLocation), "please fuck yes")

  },[destinationLocation]);
  return (
    
    <div className = "holder-app">

      <div className = "searchBar"> 
        {/* <SearchBar parentCallBack={handleCallBack} /> */}
        <SearchBarNew parentCallBack={handleCallBackDestination}  />
       
      </div>
      <div className = "map">
        {/* <Map mapPosition = {originLocation}  /> */}
        {/* <NewMap lat = {originLocation.lat} lng = {originLocation.lng} zoomIn = {zoomIn}/> */}
        {/* <DirectionMap /> */}
        <DistanceFinder origin = {originLocation} parentCallBack={handleCallBackOrigin} />

        {destinationLocation === null || destinationLocation.lat === null || originLocation.lat === null ?
        (<NewMap lat = {originLocation.lat} lng = {originLocation.lng} zoomIn = {zoomIn}/>) 
         :(<DirectionMap origin = {originLocation} destination = {destinationLocation}/>)}
        </div>
    </div>
  );
}

export default App;