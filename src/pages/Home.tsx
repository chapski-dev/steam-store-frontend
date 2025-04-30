


export const Home = ({addToCart}) => {
  const skins = [
    { id: 1, name: 'AK-47 | Redline', price: 25 },
    { id: 2, name: 'M4A4 | Howl', price: 150 },
    { id: 3, name: 'AWP | Dragon Lore', price: 2000 },
  ];


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Доступные скины</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skins.map(skin => (
          <div key={skin.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{skin.name}</h3>
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