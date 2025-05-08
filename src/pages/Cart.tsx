import { useCartStore } from "../store/cart";

export const Cart = () => {
  const { items, removeItem, increment, decrement, clearCart } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Ваша корзина</h2>
      {items.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-black">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <p className="text-gray-600">{item.quantity}</p>

                <div className="w-full flex justify-between">
                  <div className="flex gap-4">
                    <button
                      onClick={() => increment(item.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                    >
                      +
                    </button>
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded mt-4"
                      onClick={() => decrement(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <div className="flex gap-4 flex-col">
          <div className="mt-6">
            <h3>Итого: ${total.toFixed(2)}</h3>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              children="Оформить заказ"
            />
          </div>
          <div>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-2 px-4 rounded"
              children="Очистить корзину"
            />
          </div>
        </div>
      )}
    </section>
  );
};
