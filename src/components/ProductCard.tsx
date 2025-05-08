import { useCartStore } from "../store/cart";
import { useFavoriteStore } from "../store/favorite";
import HeartIcon from "../assets/heart.svg";
import HeartFilledIcon from "../assets/heart-filled.svg";



function ProductCard({ skin }) {
  const { addToFavorites, favorites, removeFromFavorites } = useFavoriteStore();
  const addToCart = useCartStore((state) => state.addItem);
  const isInFav = favorites.some((el) => el.id === skin.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={skin.image}
        alt={skin.description}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl text-black">{skin.name}</h3>
        <p className="text-gray-600">${skin.price.toFixed(2)}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => addToCart(skin)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Buy
          </button>
          <button onClick={() => isInFav ? removeFromFavorites(skin.id) : addToFavorites(skin)} className="text-red-500 hover:text-red-700">
            <img src={isInFav ? HeartFilledIcon : HeartIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
