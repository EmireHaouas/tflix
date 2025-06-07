import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Profile.css";

const Profile = () => {
  const { profile, user, loading, setProfile } = useUser();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
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
      <img className="profileAvatar" src={profile.avatar} alt="Avatar" />

      {editing ? (
        <form onSubmit={handleUpdate} className="profileEditForm">
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Pseudo"
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Pays"
          />
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Langue"
          />
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditing(false)}>
            Annuler
          </button>
        </form>
      ) : (
        <>
          <h2 className="profileName">{profile.pseudo}</h2>
          <p className="profileEmail">📧 {user.email}</p>
          <p className="profileCountry">🌍 {profile.country}</p>
          <p className="profileLanguage">🗣️ {profile.language}</p>
          <button className="editBtn" onClick={() => setEditing(true)}>
            Modifier
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
