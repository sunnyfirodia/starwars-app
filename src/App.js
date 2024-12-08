import React, { useState, useEffect, Suspense, lazy } from 'react';
import { fetchMovies, fetchMovieRatings } from './services/movieService';
import Skeleton from 'react-loading-skeleton';

const MovieList = lazy(() => import('./components/MovieList'));
const MovieDetails = lazy(() => import('./components/MovieDetails'));
const FilterSort = lazy(() => import('./components/FilterSort'));

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    };

    loadMovies();
  }, []);

  const handleSelectMovie = async (movie) => {
    setSelectedMovie(movie);
    const movieRatings = await fetchMovieRatings(movie.title);
    setRatings(movieRatings);
  };

  const handleFilter = (filterText) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleSort = (sortOption) => {
    const sorted = [...filteredMovies].sort((a, b) => {
      if (sortOption === 'year') return new Date(a.release_date) - new Date(b.release_date);
      if (sortOption === 'episode') return a.episode_id - b.episode_id;
      return 0;
    });
    setFilteredMovies(sorted);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full bg-gray-100">
         <Suspense fallback={<Skeleton count={5} />}>
           <FilterSort onFilter={handleFilter} onSort={handleSort} />
        </Suspense>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<Skeleton count={5} />}>
           <MovieList movies={filteredMovies} onSelectMovie={handleSelectMovie} />
        </Suspense>
        <Suspense fallback={<Skeleton count={5} />}>
           <MovieDetails movie={selectedMovie} ratings={ratings} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
