import React from 'react';
import StarRatings from './StarRatings';
import { FaFilm } from "react-icons/fa";

const MovieDetails = ({ movie, ratings }) => {
  if (!movie) {
    return (
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto p-4 mt-4 flex justify-center items-center bg-gray-100 border rounded-lg shadow-md">
        <div className="text-center">
          <FaFilm className="mx-auto mb-4 text-6xl text-gray-400" aria-label="film icon" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Movie Selected</h3>
          <p className="text-sm text-gray-500">Please select a movie to see details.</p>
        </div>
      </div>
    );
  }

  const { title, opening_crawl, director, producer, release_date, episode_id } = movie;

  const convertToRoman = (num) => {
    const romanNumerals = [
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' },
    ];

    let result = '';
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 mx-auto p-4 bg-white rounded shadow-lg overflow-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        Episode {convertToRoman(episode_id)} - {title}
      </h2>
      <div className="flex flex-col lg:flex-row gap-4">
        {ratings?.Poster && (
          <img
            src={ratings.Poster}
            alt={title}
            className="w-full lg:w-1/3 h-auto object-cover rounded shadow"
          />
        )}
        <div className="mt-4 lg:mt-0 text-sm md:text-md text-gray-600 flex-1">
          {opening_crawl}
        </div>
      </div>

      {ratings && (
        <div className="mt-6">
          <div className="text-sm md:text-md">
            <p className="mb-2">
              <span className="font-semibold">Directed by:</span> {director}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Produced by:</span> {producer}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Release Year:</span> {new Date(release_date).getFullYear()}
            </p>
          </div>
          <StarRatings ratings={ratings} />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
