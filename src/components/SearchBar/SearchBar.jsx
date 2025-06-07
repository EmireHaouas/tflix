import React from "react";
import "./SearchBar.css";
import iconSearch from "../../assets/imgs/icon-search.svg";

const SearchBar = ({ onClick, value, onChange, placeholder }) => {
  return (
    <div className="searchBar">
      <img
        className="iconSearch"
        onClick={onClick}
        src={iconSearch}
        alt="search icon"
      />
      <input
        value={value}
        onChange={onChange}
        className="inputSearch"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
export default SearchBar;
