import React from 'react';

const FilterSidebar = ({ filters, selectedFilters, onFilterChange }) => {
  return (
    <aside className="w-64 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Фильтры</h2>
      {filters.map((filter) => (
        <div key={filter.name} className="mb-4">
          <h3 className="text-lg font-medium mb-2 text-blue-800">{filter.label}</h3>
          {filter.options.map((option) => (
            <div key={option} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={`${filter.name}-${option}`}
                checked={selectedFilters[filter.name]?.includes(option) || false}
                onChange={() => onFilterChange(filter.name, option)}
                className="mr-2"
              />
              <label htmlFor={`${filter.name}-${option}`} className='text-blue-800'>{option}</label>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;
