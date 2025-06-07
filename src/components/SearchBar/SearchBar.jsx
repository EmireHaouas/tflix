import React from "react";
import "./SearchBar.css";
import iconSearch from "../../assets/imgs/icon-search.svg";

const SearchBar = ({
  onClick,
  value,
  onChange,
  placeholder,
  deleteSearch,
  iconVisibility,
}) => {
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
      <p className={iconVisibility} onClick={deleteSearch}>
        X
      </p>
    </div>
  );
};
export default SearchBar;
