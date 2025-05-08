import { useCartStore } from "../store/cart";



export const Home = () => {
  const skins = [
    { id: '1', name: 'AK-47 | Redline', price: 25, image: 'https://community.cloudflare.steamstatic.com/economy/image/class/570/1723133640/256x128' },
    { id: '2', name: 'M4A4 | Howl', price: 150, image: 'https://community.cloudflare.steamstatic.com/economy/image/class/570/644964380/256x128' },
    { id: '3', name: 'AWP | Dragon Lore', price: 2000, image: 'https://community.cloudflare.steamstatic.com/economy/image/class/570/2460908135/256x128' },
  ];

  const addToCart = useCartStore(state => state.addItem);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Доступные скины</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skins.map(skin => (
          <div key={skin.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{skin.name}</h3>
            <img src={skin.image} />
            <p>Цена: ${skin.price}</p>
            <button
              onClick={() => addToCart(skin)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};