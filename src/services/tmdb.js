const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const data = await response.json();

  return data.results;
};


export const searchMovies = async query => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
  
    const data = await response.json();
    return data.results;
  };


  export const getMovieDetails = async movieId => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
  
    return response.json();
  };
  
  export const getMovieCast = async movieId => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch movie cast');
    }
  
    const data = await response.json();
    return data.cast;
  };
  
  export const getMovieReviews = async movieId => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch movie reviews');
    }
  
    const data = await response.json();
    return data.results;
  };