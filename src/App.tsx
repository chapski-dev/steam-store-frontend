import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Auth } from './pages/Auth';
import { Inventory } from './pages/Inventory';
import Market from './pages/Market';
import { Cart } from './pages/Cart';
import { MainLayout } from './layout/MainLayout';
import { FavoritePage } from './pages/Favorite';

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="auth" element={<Auth />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path='market' element={<Market />} />
        <Route path='cart' element={<Cart />} />
        <Route path='favorite' element={<FavoritePage />} />

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
    </MainLayout>
  )
}

export default App
