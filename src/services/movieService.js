import axios from 'axios';

const SWAPI_URL = 'https://swapi.dev/api/films/?format=json';
const OMDB_API_URL = 'https://www.omdbapi.com/';
const OMDB_API_KEY = 'b9a5e69d';

export const fetchMovies = async () => {
  const response = await axios.get(SWAPI_URL);
  return response.data.results;
};

export const fetchMovieRatings = async (movieTitle) => {
  try {
    const response = await axios.get(`${OMDB_API_URL}?t=${movieTitle}&apikey=${OMDB_API_KEY}`);
    const data = response.data;
    const imdb = parseFloat(data.imdbRating) || 0; 
    const rottenTomatoes = parseFloat(
      data.Ratings?.find((rating) => rating.Source === 'Rotten Tomatoes')?.Value.replace('%', '')
    ) || 0;
    const metacritic = parseFloat(data.Metascore) || 0;
    const ratingsCount = [imdb, rottenTomatoes / 10, metacritic / 10].filter((rating) => rating > 0).length;
    const average = ratingsCount > 0 ? (imdb + rottenTomatoes / 10 + metacritic / 10) / ratingsCount : 0;

    return {
      imdb,
      rottenTomatoes,
      metacritic,
      Poster: data.Poster,
      average,
    };
  } catch (error) {
    console.error('error', error);
    return {
      imdb: 0,
      rottenTomatoes: 0,
      metacritic: 0,
      Poster: '',
      average: 0,
    };
  }
};
