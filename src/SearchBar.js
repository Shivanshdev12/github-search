import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => (
    <div>
        <h1>Github-Search-Card</h1>
        <input type="text"
            placeholder="Search github username.."
            onChange={props.onChange}
            value={props.value}></input><br/>
        <button onClick={props.onSubmit}>Search</button>
    </div>

);

export default SearchBar;