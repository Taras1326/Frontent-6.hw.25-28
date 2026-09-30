import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/tmdb';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCast = async () => {
      try {
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadCast();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {cast.length === 0 ? (
        <p>We don't have any cast information.</p>
      ) : (
        <ul>
          {cast.map(actor => {
            const photoUrl = actor.profile_path
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : null;

            return (
              <li key={actor.cast_id || actor.id}>
                {photoUrl && (
                  <img
                    src={photoUrl}
                    alt={actor.name}
                    width="120"
                  />
                )}

                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cast;