import './App.css';
import { useState,useEffect } from 'react';
import Map from './component/Map/Map'
import SearchBar from './component/Search bar/SearchBar';

function App() {

  const [originLocation,SetoriginLocation] = useState({lat:null,lng:null})
  const [destinationLocation,SetdestinationLocation] = useState ({lat:null,lng:null})
  const [zoomIn,setZoomIn] = useState(15)
  const [test,settest] = useState()

 //for handling search bar changes
  const handleCallBack= (childData) => {
    SetoriginLocation(childData.origin)
    SetdestinationLocation(childData.destination)
   
  }

  
    return (
    
      <div className = "holder-app">
        
        <div className = "searchBar"> 
         <SearchBar parentCallBack={handleCallBack} />
        </div>
        <div className = "map">
          <Map origin = {originLocation} destination={destinationLocation} /> 
        </div>
      </div>
    );
  
  
  
}


export default App;