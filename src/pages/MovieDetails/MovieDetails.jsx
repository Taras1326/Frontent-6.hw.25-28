import { useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';

import { getMovieDetails } from '../../services/tmdb';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadMovie();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const userScore = Math.round(movie.vote_average * 10);

  return (
    <main className={styles.container}>
      <Link
        className={styles.back}
        to={backLinkRef.current}
      >
        Go back
      </Link>

      <div className={styles.movie}>
        {posterUrl && (
          <img
            className={styles.poster}
            src={posterUrl}
            alt={movie.title}
          />
        )}

        <div className={styles.info}>
          <h1>
            {movie.title}{' '}
            {movie.release_date &&
              `(${movie.release_date.slice(0, 4)})`}
          </h1>

          <p>User Score: {userScore}%</p>

          <h2>Overview</h2>
          <p>{movie.overview || 'No overview available.'}</p>

          <h2>Genres</h2>
          <p>
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map(genre => genre.name).join(', ')
              : 'No genres available.'}
          </p>
        </div>
      </div>

      <hr />

      <h2>Additional information</h2>

      <ul className={styles.additionalList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>

        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </main>
  );
};

export default MovieDetails;