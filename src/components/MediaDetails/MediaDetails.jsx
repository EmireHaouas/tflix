import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MediaDetails.css'
import Header from "../header/Header.jsx";


const MediaDetails = () => {
    const { mediaType, id } = useParams();
    const [media, setMedia] = useState(null);
    const [providers, setProviders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473';

    // Fetch les détails du média et les plateformes simultanément
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Récupération des détails du média
                const mediaResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=fr-FR`);
                const mediaData = await mediaResponse.json();
                setMedia(mediaData);

                // Récupération des plateformes de streaming
                const providerResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${apiKey}&language=fr-FR`);
                const providerData = await providerResponse.json();
                setProviders(providerData.results);

            } catch (err) {
                setError('Erreur lors du chargement des données.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, mediaType]);

    if (isLoading) return <p>Chargement...</p>;

    if (error) return <p>{error}</p>;

    if (!media) return <p>Erreur : Média non trouvé</p>;



    // Fonction pour récupérer et afficher les plateformes de streaming avec leurs logos
    const getProvidersList = () => {
        if (!providers || !providers['FR'] || !providers['FR'].flatrate) {
            return "Aucune plateforme disponible pour ce média en France.";
        }

        const platforms = providers['FR'].flatrate.map(platform => {
            const logoUrl = `https://image.tmdb.org/t/p/w500${platform.logo_path}`;  // Construction de l'URL pour l'image du logo
            return (
                <div key={platform.provider_id} className="platform-logo">
                    <img src={logoUrl} alt={platform.provider_name} />
                </div>
            );
        });

        return platforms.length > 0 ? platforms : "Aucune plateforme disponible en France pour ce média.";
    };

    return (
        <>
        < Header />
        <div className='mainDetails'>

            <img
                className='imgDetails'
                src={media.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1920${media.backdrop_path}`
                    : `https://image.tmdb.org/t/p/w500${media.poster_path}`}
                alt={media.title || media.name}
            />

            <h1 className='titleMedia'>{media.title || media.name}</h1>
            <p className='description'>{media.overview}</p>

            <h2 className='h2_Disponibility'>Available on :</h2>
            <div className="providers-list">
                {getProvidersList()}
            </div>
        </div>
        </>
    );
};

export default MediaDetails;
