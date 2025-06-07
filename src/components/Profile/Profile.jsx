import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Profile.css";
import Countries from "../Datas/Countries.jsx";
import TmdbLanguages from "../Datas/TmdbLanguages.js";
import back_Arrow from "../../assets/imgs/back_Arrow.webp";
import loadingIcon from "../../assets/imgs/loadingIcon.gif";

const Profile = () => {
  const { profile, user, loading, setProfile } = useUser();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [loadingProfileUpdate, setLoadingProfileUpdate] = useState(false);
  const getCountryLabel = (code) =>
    Countries.find((c) => c.code === code)?.label || code;

  const getLanguageLabel = (code) =>
    TmdbLanguages.find((l) => l.code === code)?.label || code;

  useEffect(() => {
    if (profile) {
      setPseudo(profile.pseudo);
      setCountry(profile.country);
      setLanguage(profile.language);
    }
  }, [profile]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!pseudo.trim() || !country.trim() || !language.trim()) {
      alert("All fields must be filled in.");
      return;
    }

    try {
      setLoadingProfileUpdate(true);

      const ref = doc(db, "users", user.uid);
      const newProfile = {
        ...profile,
        pseudo,
        country,
        language,
      };

      await updateDoc(ref, {
        pseudo,
        country,
        language,
      });

      localStorage.setItem("userProfile", JSON.stringify(newProfile));
      setProfile(newProfile);
      setEditing(false);
    } catch (error) {
      console.error("Error while updating the profile:", error);
    } finally {
      setLoadingProfileUpdate(false); // ✅ reste ici
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading]);

  if (loading) return <p className="profileLoading">Loading profile...</p>;
  if (!user || !profile) return <p className="profileError">Not logged in.</p>;

  return (
    <div className="profileContainer">
      <div className="backArrowContainer">
        <img
          className="back_Arrow"
          src={back_Arrow}
          alt="back arrow icon"
          onClick={() => navigate(-1)}
        />
      </div>
      <img className="profileAvatar" src={profile.avatar} alt="Avatar" />

      {editing ? (
        <form onSubmit={handleUpdate} className="profileEditForm">
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Pseudo"
          />

          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select your country</option>
            {Countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select your language</option>
            {TmdbLanguages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loadingProfileUpdate}>
            {loadingProfileUpdate ? (
              <img
                src={loadingIcon}
                alt="loading..."
                className="loadingSpinner"
              />
            ) : (
              "Save"
            )}
          </button>

          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2 className="profileName">{profile.pseudo}</h2>
          <p className="profileEmail">📧 {user.email}</p>
          <p className="profileCountry">
            🌍 {getCountryLabel(profile.country)}
          </p>
          <p className="profileLanguage">
            🗣️ {getLanguageLabel(profile.language)}
          </p>
          <button className="editBtn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
