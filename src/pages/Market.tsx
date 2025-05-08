import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import React from 'react';
const skins = [
  { id: 1, name: "Mystical Dragon", price: 25.00, image: "https://community.cloudflare.steamstatic.com/economy/image/class/570/2974026543/256x128", description: "A stunning Dota 2 skin featuring a mystical dragon design.", rarity: "legendary" },
  { id: 2, name: "Fierce Warrior", price: 30.00, image: "https://community.cloudflare.steamstatic.com/economy/image/class/570/1723133640/256x128", description: "A vibrant Dota 2 skin showcasing a fierce warrior theme.", rarity: "rare" },
  { id: 3, name: "Celestial Elegance", price: 40.00, image: "https://community.cloudflare.steamstatic.com/economy/image/class/570/644964380/256x128", description: "An elegant Dota 2 skin with a celestial theme.", rarity: "epic" },
  { id: 4, name: "Shadowy Figure", price: 20.00, image: "https://community.cloudflare.steamstatic.com/economy/image/class/570/2460908135/256x128", description: "A dark themed Dota 2 skin featuring a shadowy figure.", rarity: "mythical" },
  { id: 5, name: "Nature's Fury", price: 35.00, image: "https://community.cloudflare.steamstatic.com/economy/image/class/570/4056885176/256x128", description: "A vibrant Dota 2 skin with a nature-inspired design.", rarity: "rare" },
  { id: 6, name: "Techno Warrior", price: 50.00, image: "	https://community.cloudflare.steamstatic.com/economy/image/class/570/2143537734/256x128", description: "A futuristic Dota 2 skin showcasing advanced technology.", rarity: "legendary" }
];

const getFilteredSkins = (skins, filter, sort) => {
  const filtered = filter === 'all' ? skins : skins.filter(skin => skin.rarity === filter);
  if (sort === 'price-asc') {
    return [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  return filtered;
};

const Market = () => {

  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('price-asc');
  const filteredSkins = getFilteredSkins(skins, filter, sort);

  return (

    <main className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <FilterSidebar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        <div className="w-full md:w-3/4">
          <h2 className="text-3xl font-bold mb-4">Featured Skins</h2>
          <ProductGrid skins={filteredSkins} />
        </div>
      </div>
    </main>

  );
};

export default Market;
