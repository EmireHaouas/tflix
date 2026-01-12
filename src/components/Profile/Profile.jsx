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
import AvatarList from "../Datas/AvatarList.js";
import UserAnalytics from "../UserAnalytics/UserAnalytics.jsx";

const Profile = ({ watched }) => {
  const { profile, user, loading, setProfile } = useUser();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(null);
  const [pseudo, setPseudo] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [loadingProfileUpdate, setLoadingProfileUpdate] = useState(false);

  // Helper function to get avatar URL from index or legacy path
  const getAvatarUrl = () => {
    if (profile?.avatarIndex !== undefined && profile.avatarIndex !== null) {
      return AvatarList[profile.avatarIndex] || AvatarList[0];
    }
    // Fallback for legacy profiles with avatar path
    return profile?.avatar || AvatarList[0];
  };
  const getCountryLabel = (code) =>
    Countries.find((c) => c.code === code)?.label || code;

  const getLanguageLabel = (code) =>
    TmdbLanguages.find((l) => l.code === code)?.label || code;

  useEffect(() => {
    if (profile) {
      setPseudo(profile.pseudo);
      setCountry(profile.country);
      setLanguage(profile.language);
      // Handle both new (index) and legacy (path) avatar formats
      if (profile.avatarIndex !== undefined && profile.avatarIndex !== null) {
        setAvatarIndex(profile.avatarIndex);
        setAvatar(AvatarList[profile.avatarIndex] || AvatarList[0]);
      } else if (profile.avatar) {
        // Legacy: find index from path or use first avatar
        const index = AvatarList.findIndex((img) => img === profile.avatar);
        setAvatarIndex(index >= 0 ? index : 0);
        setAvatar(index >= 0 ? AvatarList[index] : AvatarList[0]);
      } else {
        setAvatarIndex(0);
        setAvatar(AvatarList[0]);
      }
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
        avatarIndex: avatarIndex,
      };

      await updateDoc(ref, {
        pseudo,
        country,
        language,
        avatarIndex: avatarIndex,
      });

      const updatedProfile = {
        ...newProfile,
        avatarIndex: avatarIndex,
      };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
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
      <img
        className="profileAvatar"
        src={editing ? avatar : getAvatarUrl()}
        alt="Avatar"
      />

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
          <div className="choiceOfProfilePicture">
            <p className="textProfilePicture">Choose a profile picture</p>
            <div className="profilePicture">
              {AvatarList.map((img, index) => (
                <img
                  key={index}
                  className={`availableProfilePicture ${
                    avatarIndex === index ? "selected" : ""
                  }`}
                  src={img}
                  alt={`avatar-${index}`}
                  onClick={() => {
                    setAvatar(img);
                    setAvatarIndex(index);
                  }}
                />
              ))}
            </div>
          </div>

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
      <div className="analyticsScrollContainer">
        <UserAnalytics watched={watched} />
      </div>
    </div>
  );
};

export default Profile;
