import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MediaDetails.css';
import Header from "../header/Header.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";
import iconYoutube from '../../assets/imgs/iconYoutube.png';
import iconAffiche from '../../assets/imgs/iconAffiche.png';
import bookmarked from "../Bookmarked/Bookmarked.jsx";

const MediaDetails = ({bookmarked, handleBookmarked}) => {
    const { mediaType, id } = useParams();
    const [media, setMedia] = useState(null);
    const [providers, setProviders] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473';

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    };


    //Fetch media details, platforms, and videos simultaneously.
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // URLs of requests
                const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=fr-FR`;
                const providerUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${apiKey}&language=fr-FR`;
                const videosUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}&language=fr-FR`;
                const recommendationsUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${apiKey}&language=fr-FR`;

                // Execute the queries in parallel
                const [mediaRes, providersRes, videosRes, recommendationsRes] = await Promise.all([
                    fetch(detailsUrl).then(res => res.json()),
                    fetch(providerUrl).then(res => res.json()),
                    fetch(videosUrl).then(res => res.json()),
                    fetch(recommendationsUrl).then(res => res.json())
                ]);

                setMedia(mediaRes);
                setProviders(providersRes.results);
                setVideos(videosRes.results);
                setRecommendations(recommendationsRes.results);

            } catch (err) {
                setError('Erreur lors du chargement des données.');
                console.error(err);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [id, mediaType]);

    if (isLoading) return <p>Chargement...</p>;

    if (error) return <p>{error}</p>;

    if (!media) return <p>Erreur : Média non trouvé</p>;

    const trailer = videos.find(video => video.type === "Trailer");

    const toggleTrailer = () => {
        setShowTrailer(prevState => !prevState);
    };

    const getProvidersList = () => {
        if (!providers || !providers['FR'] || !providers['FR'].flatrate) {
            return "Aucune plateforme disponible pour ce média en France.";
        }

        const platforms = providers['FR'].flatrate.map(platform => {
            const logoUrl = `https://image.tmdb.org/t/p/w500${platform.logo_path}`;

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
            <Header />
            <div className='mainDetails'>
                <h1 className='titleMedia'>{media.title || media.name}</h1>





                {showTrailer ? (
                    trailer ? (
                        <div className="video-container">
                            <iframe
                                className="trailer-video"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <p>Aucun trailer disponible.</p>
                    )
                ) : (
                    <img
                        className='imgDetails'
                        src={media.backdrop_path
                            ? `https://image.tmdb.org/t/p/w1920${media.backdrop_path}`
                            : `https://image.tmdb.org/t/p/w500${media.poster_path}`}
                        alt={media.title || media.name}
                    />
                )}

                <div className='details_RuntimeContainer'>
                    { media.release_date && (
                    <p className='runtimeMedia'>{formatDuration(media.runtime)}</p>
                        )}
                    <div className="toggleButtonContainer">
                        <button
                            className={`toggleButton ${showTrailer ? 'slide-left' : 'slide-right'}`}
                            onClick={toggleTrailer}
                        >
                            <img
                                src={iconAffiche}
                                alt="Affiche"
                                className={`icon ${showTrailer ? 'hide' : ''}`}
                            />
                            <div className="slider"></div>
                            <img
                                src={iconYoutube}
                                alt="Trailer"
                                className={`icon ${showTrailer ? '' : 'hide'}`}
                            />
                        </button>
                    </div>

                    <div className='ratingMedia'>
                        <p className='rankingProvider'>TMDB</p>
                        <p className='rank'>{media.vote_average.toFixed(1)} / 10</p>
                        <p className='averageVote'>{media.vote_count} votes</p>
                    </div>
                </div>

                <p className='genreMedia'>Genres: {media.genres.map(genre => genre.name).join(', ')}</p>
                <p className='description'>{media.overview}</p>

                <h2 className='h2_Disponibility'>Available on :</h2>
                <div className="providers-list">
                    {getProvidersList()}
                </div>
            </div>
            <div className='recommendationsContainer'>
            <h2 className='moreTitle'>More like This</h2>
            <div className='recommendationsMedia'>

            {recommendations.map ((recommendation) => (
                <StandardCard key={recommendation.id} item={recommendation} handleBookMarked={handleBookmarked} bookmarked={bookmarked} />
            )) }
            </div>
            </div>
        </>
    );
};

export default MediaDetails;
