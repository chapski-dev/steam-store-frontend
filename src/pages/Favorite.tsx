import { useCartStore } from "../store/cart";
import { useFavoriteStore } from "../store/favorite";

export function FavoritePage() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const removeFromFavorites = useFavoriteStore((state) => state.removeFromFavorites);
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Избранные товары</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">У вас нет избранных товаров.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((product) => (
            <li key={product.id} className="flex items-center justify-between border p-4 rounded-lg">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price} ₽</p>
              </div>
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  onClick={() => addToCart(product)}
                >
                  В корзину
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={() => removeFromFavorites(product.id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}