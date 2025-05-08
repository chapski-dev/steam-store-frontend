// components/FilterSidebar.jsx
const FilterSidebar = ({ filter, setFilter, sort, setSort }) => {
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'legendary', label: 'Legendary' },
    { value: 'rare', label: 'Rare' },
    { value: 'epic', label: 'Epic' },
    { value: 'mythical', label: 'Mythical' },
  ];

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  return (
<aside className="w-full md:w-1/4 md:mr-6 bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label htmlFor="filter" className="block mb-2 text-amber-600">
            Filter by:
          </label>
          <Select id="filter" options={filterOptions}  value={filter} onChange={(e) => setFilter(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="sort" className="block mb-2 text-amber-600">
            Sort by:
          </label>
          <Select value={sort} id='sort' options={sortOptions} onChange={(e) => setSort(e.target.value)} />
        </div>
      </aside>
  );
};
// function Filters({ filter, setFilter, sort, setSort }) {
//   return (
//       <aside className="w-full md:w-1/4 md:mr-6 bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0">
//           <h2 className="text-xl font-bold mb-4">Filters</h2>
//           <label htmlFor="filter" className="block mb-2">Filter by:</label>
//           <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border border-gray-300 rounded mb-4 w-full">
//               <option value="all">All</option>
//               <option value="legendary">Legendary</option>
//               <option value="rare">Rare</option>
//               <option value="epic">Epic</option>
//               <option value="mythical">Mythical</option>
//           </select>
//           <label htmlFor="sort" className="block mb-2">Sort by:</label>
//           <Select value={sort} id='sort' options={sortOptions} onChange={} onChange={(e) => setSort(e.target.value)} />
//           <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 border border-gray-300 rounded w-full">
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//           </select>
//       </aside>
//   );
// }


const Select = ({ id, options, value, onChange }) => (
  <select
    id={id}
    onChange={onChange}
    value={value}
    className="p-2 border border-gray-300 rounded w-full text-amber-300"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default FilterSidebar;