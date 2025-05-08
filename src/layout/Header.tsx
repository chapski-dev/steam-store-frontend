import { NavLink } from "react-router";
import CartIcon from '../assets/cart.svg'
import Logo from '../assets/png/logo.png'
import { useCartStore } from "../store/cart";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import { useUserStore } from "../store/user";
import HeartIcon from "../assets/heart.svg";
import HeartFilledIcon from "../assets/heart-filled.svg";
import { useFavoriteStore } from "../store/favorite";
import UserDropdown from "../components/UserDropdown";


export const Header = () => {
  const { user } = useUserStore();
  const { items } = useCartStore();
  const { favorites } = useFavoriteStore();

  const total = items.reduce((sum, item) => sum + item.quantity, 0);


  const handleLogin = () => {
    window.location.href = 'https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=' + window.location.origin + '/auth&openid.realm=' + window.location.origin + '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select';
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <a href="/">
        <img src={Logo} className='w-26' />
      </a>
      <nav className="space-x-6">
        <NavLink to="/market">Market</NavLink>
        <NavLink to="/crypto">Crypto</NavLink>

        {user && <NavLink children="Инвентарь" to='/inventory' />}
      </nav>
      <div className="flex gap-3">
        {/* <ConnectWallet /> */}

        {user ? (
          <UserDropdown />
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Войти через Steam
          </button>
        )}

        <a href="/cart" className="relative py-2 px-4 rounded">
          <img src={CartIcon} className='w-8' />
          {total > 0 && (
            <span className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {total}
            </span>
          )}
        </a>
        <a href="/favorite" className="relative py-2 px-4 rounded">
          <img src={favorites.length ? HeartFilledIcon : HeartIcon} className='w-8' />
        </a>
      </div>
    </header>
  );
};

function ConnectWallet() {
  const { isConnected } = useAccount()
  console.log('isConnected', isConnected);

  if (isConnected) return <Account />
  return <WalletOptions />
}

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ))
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ; (async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  )
}


export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}