import React, {useState} from 'react';
import './ProfileSetup.css';
import {Link} from "react-router-dom";
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

const ProfileSetup = () => {
    const [pseudo, setPseudo] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    return (
        <>
            <main className="mainProfileSetup">
            <div className='profileSetup'>
                <div className='PseudoInput'>
                <p>Enter a pseudo</p>
                <input type='text' placeholder='Enter a Pseudo'/>
                </div>
                <div className='CountryInput'>
                <p> Enter your country</p>
                    <select className="data_Check" required>
                        <option>Japan</option>
                        {Countries.map((country, index) => (
                            <option key={index}>{country}</option>
                        ))}
                    </select>
                </div>
                <div className='LanguageInput'>
                <p>Choose your language</p>
                <input type='text' placeholder='Enter your language'/>
                </div>
                <div className='choiceOfProfilePicture'>
                    <p className='textProfilePicture'>Choose a profile picture</p>
                    <div className='profilePicture'>
                        <img className='availableProfilePicture' src={Bat} alt=''/>
                        <img className='availableProfilePicture' src={Cat} alt=''/>
                        <img className='availableProfilePicture' src={Bull} alt=''/>
                        <img className='availableProfilePicture' src={Carlin} alt=''/>
                        <img className='availableProfilePicture' src={Dragon} alt=''/>
                        <img className='availableProfilePicture' src={Fox} alt=''/>
                        <img className='availableProfilePicture' src={Goat} alt=''/>
                        <img className='availableProfilePicture' src={Jaguar} alt=''/>
                        <img className='availableProfilePicture' src={Lemur} alt=''/>
                        <img className='availableProfilePicture' src={Phoenix} alt=''/>
                        <img className='availableProfilePicture' src={Pig} alt=''/>
                        <img className='availableProfilePicture' src={Pinguin} alt=''/>
                        <img className='availableProfilePicture' src={Sheep} alt=''/>
                        <img className='availableProfilePicture' src={Velociraptor} alt=''/>
                        <img className='availableProfilePicture' src={Wolf} alt=''/>

                    </div>
                </div>
            </div>
            </main>
        </>
    );
};
export default ProfileSetup;