import './SearchBar.css';
import React from 'react';
import ReactDOM from 'react-dom';


export function SearchBar() {
    return (
      
      <div className = "holder">
        <input type="text" placeholder="Location to" className = "searchBar-to"/>

      </div>
  
    );
  } 
  
  export default SearchBar;
  