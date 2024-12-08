import React, { useState } from 'react';

function FilterSort({ onFilter, onSort }) {
    const [filter, setFilter] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        onFilter(value);
      };
    
      const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);
        onSort(value);
      };

    return (
            <>
                <div className="p-4 bg-gray-100 ">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Filter by name"
                            className="p-2 border rounded flex-1"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="p-2 border rounded w-1/5"
                    >
                        <option value="">Sort By</option>
                        <option value="year">Year</option>
                        <option value="episode">Episode</option>
                    </select>
                    </div>
                    </div>
            </>
      )
}

export default FilterSort