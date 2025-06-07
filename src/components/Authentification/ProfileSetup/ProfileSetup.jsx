import React, { useState, useEffect } from "react";
import "./ProfileSetup.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "../../../context/UserContext";
import Countries from "../../Datas/Countries.jsx";
import TmdbLanguages from "../../Datas/TmdbLanguages.js";
import Bat from "../../../assets/imgs/ProfilePicture/iconBat.png";
import Cat from "../../../assets/imgs/ProfilePicture/iconCat.png";
import Bull from "../../../assets/imgs/ProfilePicture/iconBull.png";
import Carlin from "../../../assets/imgs/ProfilePicture/iconCarlin.png";
import Dragon from "../../../assets/imgs/ProfilePicture/iconDragon.png";
import Fox from "../../../assets/imgs/ProfilePicture/iconFox.png";
import Goat from "../../../assets/imgs/ProfilePicture/iconGoat.png";
import Jaguar from "../../../assets/imgs/ProfilePicture/iconJaguar.png";
import Lemur from "../../../assets/imgs/ProfilePicture/iconLemur.png";
import Phoenix from "../../../assets/imgs/ProfilePicture/iconPhoenix.png";
import Pig from "../../../assets/imgs/ProfilePicture/iconPig.png";
import Pinguin from "../../../assets/imgs/ProfilePicture/iconPinguin.png";
import Sheep from "../../../assets/imgs/ProfilePicture/iconSheep.png";
import Velociraptor from "../../../assets/imgs/ProfilePicture/iconVelociraptor.png";
import Wolf from "../../../assets/imgs/ProfilePicture/iconWolf.png";

const avatars = [
  Bat,
  Cat,
  Bull,
  Carlin,
  Dragon,
  Fox,
  Goat,
  Jaguar,
  Lemur,
  Phoenix,
  Pig,
  Pinguin,
  Sheep,
  Velociraptor,
  Wolf,
];

const ProfileSetup = () => {
  const [pseudo, setPseudo] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const { user, loading, profile } = useUser();

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated.");
      return;
    }

    if (
      !pseudo.trim() ||
      !country.trim() ||
      !language.trim() ||
      !profilePicture
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        pseudo: pseudo.trim(),
        country: country.trim(),
        language: language.trim(),
        avatar: profilePicture,
      });

      navigate("/");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving your profile.");
    }
  };

  useEffect(() => {
    if (user && !loading && profile) {
      navigate("/");
    }
  }, [user, loading, profile]);

  return (
    <main className="mainProfileSetup">
      <div className="profileSetup">
        <h2 className="setupTitle">Complete your profile</h2>
        <div className="PseudoInput">
          <p>Enter a pseudo</p>
          <input
            type="text"
            placeholder="Enter a Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>

        <div className="CountryInput">
          <p>Enter your country</p>
          <select
            className="data_Check"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select your country</option>
            {Countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div className="LanguageInput">
          <p>Choose your language</p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          >
            <option value="">Select your language</option>
            {TmdbLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="choiceOfProfilePicture">
          <p className="textProfilePicture">Choose a profile picture</p>
          <div className="profilePicture">
            {avatars.map((img, index) => (
              <img
                key={index}
                className={`availableProfilePicture ${profilePicture === img ? "selected" : ""}`}
                src={img}
                alt={`avatar-${index}`}
                onClick={() => setProfilePicture(img)}
              />
            ))}
          </div>
        </div>

        <button className="btnConfirmProfile" onClick={handleSubmit}>
          Save and continue
        </button>
      </div>
    </main>
  );
};

export default ProfileSetup;
