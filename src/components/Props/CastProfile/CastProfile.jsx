import React from "react";
import "./CastProfile.css";

const CastProfile = ({ name, img, character }) => {
  return (
    <div className="castProfileContainer">
      <img className="castProfilePicture" src={img} alt="Cast profile image" />
      <p className="castName">{name}</p>
      <p className="characterName">{character}</p>
    </div>
  );
};
export default CastProfile;
