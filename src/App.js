import './App.css';
import Map from './component/Map/Map';
import Data from './component/Data/Data';
import SearchBar from './component/Search bar/SearchBar'



function App() {
  return (

    <div className = "holder-app">
      <div className = "searchBar"> 
        <SearchBar />
      </div>
      <div className = "map">
        <Map   />
        </div>
        
    </div>

  );
}

export default App;
