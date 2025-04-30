

export const Header = ({ cartItems }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  // const cartItems = JSON.parse(localStorage.getItem('cartItems') || 'null');


  const handleLogin = () => {
    window.location.href = 'https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=' + window.location.origin + '/auth&openid.realm=' + window.location.origin + '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select';
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <a href="/" className="text-xl font-bold">Steam Marketplace</a>
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
          <img src={user.avatar} />
          <span>{user.name || 'Пользователь'}</span>
          </>
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Войти через Steam
          </button>
        )}
        <a href="/cart" className="relative bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Корзина
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </a>
      </nav>
    </header>
  );
};