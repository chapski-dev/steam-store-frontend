import { useEffect, useState } from "react";

export const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      setError("Пожалуйста, авторизуйтесь через Steam.");
      setLoading(false);
      return;
    }

    const steamId = user.id;

    // Если инвентаря нет, делаем запрос
    async function fetchInventory() {
      try {
        const inventoryUrl = `http://localhost:3000/api/steam/inventory?steam_id=${steamId}`;
        const response = await fetch(inventoryUrl);
        const data = await response.json();
        if (data.success) {
          /** */
          localStorage.setItem("inventory", JSON.stringify(data));
          const items = data.descriptions.map((item) => {

            return {
              id: item.id,
              name: item?.name || "Неизвестный предмет",
              image: item?.icon_url
                ? `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`
                : "",
              tradable: item?.tradable === 1,
              marketable: item?.marketable === 1,
              ...item
            };
          });
          setInventoryItems(items);
        } else {
          setError(data.Error || "Не удалось загрузить инвентарь.");
        }
      } catch (err) {
        setError("Ошибка при загрузке инвентаря: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);

  if (loading) {
    return <div className="p-4">Загрузка инвентаря...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ваш инвентарь</h2>
      {inventoryItems.length === 0 ? (
        <p>Ваш инвентарь пуст.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {inventoryItems.map((item) => (
            <div key={item.id} className="flex flex-col border p-4 rounded shadow">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain mx-auto mb-2"
                />
              )}
              <h3 className="text-lg font-semibold">{item.name}</h3>
              {item?.tags.map((el) => (
                <div>
                  <span className='text-sm'>{el.category}: {' '}</span>
                  <span style={{ color: el?.color ? `#${el.color}` : undefined }}>{el.localized_tag_name}</span>
                </div>
              ))}
              <div className="h-px w-full bg-gray-200" />
              <div className="mb-4">
                <p>Можно обменять: {item.tradable ? "Да" : "Нет"}</p>
                <p>Можно продать: {item.marketable ? "Да" : "Нет"}</p>
              </div>
              {(!!item.tradable && !!item.marketable) && (
                <button
                  // onClick={() => addToCart(item)}
                  disabled={!item.tradable || !item.marketable}
                  className={`mt-auto w-full py-2 px-4 rounded text-white font-bold ${item.tradable && item.marketable
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-500 cursor-not-allowed"
                    }`}
                >
                  Выставить на продажу
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};