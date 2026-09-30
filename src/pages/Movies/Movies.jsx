import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const loadMovies = async () => {
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadMovies();
  }, [query]);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const value = form.elements.query.value.trim();

    if (!value) return;

    setSearchParams({ query: value });
  };

  return (
    <main className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          className={styles.input}
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies"
        />
  
        <button
          className={styles.button}
          type="submit"
        >
          Search
        </button>
      </form>
  
      {error && <p>{error}</p>}
  
      <MovieList movies={movies} />
    </main>
  );
};

export default Movies;