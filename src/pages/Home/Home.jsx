import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadMovies();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>

      {error && <p>{error}</p>}

      <MovieList movies={movies} />
    </main>
  );
};

export default Home;