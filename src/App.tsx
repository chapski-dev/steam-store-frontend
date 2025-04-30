import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { About } from './pages/About'
import {  useEffect, useState } from 'react';
import { Auth } from './pages/Auth';
import { Header } from './layout/Header';

function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  console.log("path", path);
  

  const addToCart = (skin:any) => {
    localStorage.setItem('cartItems', skin)
    setCartItems((state) => [...state, skin])
  }

  


  return (
    <>
    <Header cartItems={cartItems} />
    <Routes>
      <Route index element={<Home addToCart={addToCart} />} />
      <Route path="about" element={<About />} />
      <Route path="auth" element={<Auth />} />


      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
    </>
  )
}

export default App
