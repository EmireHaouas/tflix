import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MediaDetails.css";
import Header from "../header/Header.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";
import iconYoutube from "../../assets/imgs/iconYoutube.png";
import iconAffiche from "../../assets/imgs/iconAffiche.png";
import back_Arrow from "../../assets/imgs/back_Arrow.webp";
import CastProfile from "../Props/CastProfile/CastProfile.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { getUserLanguage } from "../../Utils/apiConfig.js";

const MediaDetails = ({ bookmarked, handleBookMark }) => {
  const apiKey = "7898561c441dbd5aa0c4b3a3677ff473";
  const { mediaType, id } = useParams();
  const [media, setMedia] = useState(null);
  const [providers, setProviders] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const navigate = useNavigate();

  const { profile, loading } = useUser();

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  useEffect(() => {
    if (loading) return;

    const lang = profile ? getUserLanguage(profile) : "en-US";

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=${lang}`;
        const providerUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${apiKey}`;
        const videosUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}&language=${lang}`;
        const recommendationsUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${apiKey}&language=${lang}`;
        const castUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${apiKey}`;

        const [mediaRes, providersRes, videosRes, recommendationsRes, castRes] =
          await Promise.all([
            fetch(detailsUrl).then((res) => res.json()),
            fetch(providerUrl).then((res) => res.json()),
            fetch(videosUrl).then((res) => res.json()),
            fetch(recommendationsUrl).then((res) => res.json()),
            fetch(castUrl).then((res) => res.json()),
          ]);

        setMedia(mediaRes);
        setProviders(providersRes.results);
        setVideos(videosRes.results);
        setRecommendations(recommendationsRes.results);
        setCast(castRes.cast || []);
      } catch (err) {
        console.error(err);
        setError("Error loading data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, mediaType, loading, profile]);

  if (isLoading) return <p className="loadingMessage">loading...</p>;
  if (error) return <p>{error}</p>;
  if (!media) return <p>Error: Media not found</p>;

  const trailer = videos.find((video) => video.type === "Trailer");

  const toggleTrailer = () => setShowTrailer((prev) => !prev);

  const getProvidersList = () => {
    if (!providers || !providers["FR"] || !providers["FR"].flatrate) {
      return `No platform available for this ${mediaType}`;
    }

    return providers["FR"].flatrate.map((platform) => (
      <div key={platform.provider_id} className="platform-logo">
        <img
          src={`https://image.tmdb.org/t/p/w500${platform.logo_path}`}
          alt={platform.provider_name}
        />
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div className="backArrowContainer">
        <img
          className="back_Arrow"
          src={back_Arrow}
          alt="back arrow icon"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="mainDetails">
        <h1 className="titleMedia">{media.title || media.name}</h1>

        {showTrailer && trailer ? (
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
          <img
            className="imgDetails"
            src={
              media.backdrop_path
                ? `https://image.tmdb.org/t/p/w1920${media.backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${media.poster_path}`
            }
            alt={media.title || media.name}
          />
        )}

        <div className="details_RuntimeContainer">
          {media.runtime && (
            <p className="runtimeMedia">{formatDuration(media.runtime)}</p>
          )}

          <div className="toggleButtonContainer">
            <button
              className={`toggleButton ${showTrailer ? "slide-left" : "slide-right"}`}
              onClick={toggleTrailer}
            >
              <img
                src={iconAffiche}
                alt="Affiche"
                className={`icon ${showTrailer ? "hide" : ""}`}
              />
              <div className="slider"></div>
              <img
                src={iconYoutube}
                alt="Trailer"
                className={`icon ${showTrailer ? "" : "hide"}`}
              />
            </button>
          </div>

          <div className="ratingMedia">
            <p className="rankingProvider">TMDB</p>
            <p className="rank">{media.vote_average.toFixed(1)} / 10</p>
            <p className="averageVote">{media.vote_count} votes</p>
          </div>
        </div>

        <p className="genreMedia">
          Genres: {media.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="description">{media.overview}</p>

        <h2 className="h2_Disponibility">Available on :</h2>
        <div className="providers-list">{getProvidersList()}</div>

        <div className="recommendationsContainer">
          <h2 className="moreTitle">More like This</h2>
          <div className="recommendationsMedia">
            {recommendations.map((recommendation) => (
              <StandardCard
                key={recommendation.id}
                item={recommendation}
                handleBookMarked={handleBookMark}
                bookmarked={bookmarked}
                variant="recommendation"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cast">
        <h2 className="h2_Cast">Cast</h2>
        <div className="castContainer">
          {cast.length > 0 ? (
            cast.map((actor) => (
              <CastProfile
                key={actor.id}
                name={actor.name}
                character={actor.character}
                img={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              />
            ))
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MediaDetails;
