import React from 'react';

const StarRatings = ({ ratings }) => {
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 10 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span key={`full-${index}`} className="text-yellow-500 text-sm md:text-base lg:text-lg">★</span>
          ))}
        {halfStar === 1 && <span className="text-yellow-500 text-sm md:text-base lg:text-lg">☆</span>}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span key={`empty-${index}`} className="text-gray-300 text-sm md:text-base lg:text-lg">★</span>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mt-4 text-center sm:text-left">
        <span className="font-bold text-sm md:text-base">Average Rating:</span>
        <div className="mt-1 sm:mt-0">
          {ratings.average > 0 ? generateStars(ratings.average) : <span className="text-gray-500">N/A</span>}
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start mt-4 gap-2">
        <span className="border border-blue-300 text-blue-500 text-xs md:text-sm px-2 py-1 rounded-full">
          IMDb: {ratings.imdb > 0 ? ratings.imdb.toFixed(1) : 'N/A'}
        </span>
        <span className="border border-blue-300 text-blue-500 text-xs md:text-sm px-2 py-1 rounded-full">
          Rotten Tomatoes: {ratings.rottenTomatoes > 0 ? `${ratings.rottenTomatoes}%` : 'N/A'}
        </span>
        <span className="border border-blue-300 text-blue-500 text-xs md:text-sm px-2 py-1 rounded-full">
          Metacritic: {ratings.metacritic > 0 ? ratings.metacritic : 'N/A'}
        </span>
      </div>
    </>
  );
};

export default StarRatings;
