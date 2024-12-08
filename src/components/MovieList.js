import React, { useState, useEffect } from "react";

function MovieList({ movies, onSelectMovie }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  return (
    <div className="w-full sm:w-full md:w-2/3 lg:w-2/5 p-4 border-r border-gray-300 overflow-auto bg-white">
      <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Movies</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className="space-y-4">
          {movies.map((movie) => (
            <li
              key={movie.episode_id}
              className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded shadow transition-all"
              onClick={() => onSelectMovie(movie)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="text-sm text-gray-700">Episode {movie.episode_id}</div>
                <h3 className="text-lg font-semibold text-gray-800 sm:ml-4">{movie.title}</h3>
                <span className="text-sm text-gray-500 sm:ml-4">
                  {new Date(movie.release_date).toISOString().split("T")[0]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
