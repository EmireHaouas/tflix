import React, { useState } from 'react';
import './ProfileSetup.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import Countries from "../../Datas/Countries.jsx";
import Bat from '../../../assets/imgs/ProfilePicture/iconBat.png';
import Cat from '../../../assets/imgs/ProfilePicture/iconCat.png';
import Bull from '../../../assets/imgs/ProfilePicture/iconBull.png';
import Carlin from '../../../assets/imgs/ProfilePicture/iconCarlin.png';
import Dragon from '../../../assets/imgs/ProfilePicture/iconDragon.png';
import Fox from '../../../assets/imgs/ProfilePicture/iconFox.png';
import Goat from '../../../assets/imgs/ProfilePicture/iconGoat.png';
import Jaguar from '../../../assets/imgs/ProfilePicture/iconJaguar.png';
import Lemur from '../../../assets/imgs/ProfilePicture/iconLemur.png';
import Phoenix from '../../../assets/imgs/ProfilePicture/iconPhoenix.png';
import Pig from '../../../assets/imgs/ProfilePicture/iconPig.png';
import Pinguin from '../../../assets/imgs/ProfilePicture/iconPinguin.png';
import Sheep from '../../../assets/imgs/ProfilePicture/iconSheep.png';
import Velociraptor from '../../../assets/imgs/ProfilePicture/iconVelociraptor.png';
import Wolf from '../../../assets/imgs/ProfilePicture/iconWolf.png';

const avatars = [
    Bat, Cat, Bull, Carlin, Dragon, Fox, Goat, Jaguar,
    Lemur, Phoenix, Pig, Pinguin, Sheep, Velociraptor, Wolf
];

const ProfileSetup = () => {
    const [pseudo, setPseudo] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const user = auth.currentUser;
        if (!user) return;

        if (!pseudo || !country || !language || !profilePicture) {
            alert("Please complete all fields.");
            return;
        }

        try {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                pseudo,
                country,
                language,
                avatar: profilePicture,
            });

            navigate("/dashboard"); // Redirection après configuration
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du profil :", error);
        }
    };

    return (
        <main className="mainProfileSetup">
            <div className='profileSetup'>
                <div className='PseudoInput'>
                    <p>Enter a pseudo</p>
                    <input
                        type='text'
                        placeholder='Enter a Pseudo'
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>

                <div className='CountryInput'>
                    <p>Enter your country</p>
                    <select
                        className="data_Check"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                        <option value="">Select your country</option>
                        {Countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className='LanguageInput'>
                    <p>Choose your language</p>
                    <input
                        type='text'
                        placeholder='Enter your language'
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                </div>

                <div className='choiceOfProfilePicture'>
                    <p className='textProfilePicture'>Choose a profile picture</p>
                    <div className='profilePicture'>
                        {avatars.map((img, index) => (
                            <img
                                key={index}
                                className={`availableProfilePicture ${profilePicture === img ? 'selected' : ''}`}
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
