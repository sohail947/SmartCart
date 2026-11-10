import ProductDetails from './pages/ProductDetails';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './components/homepage';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/cart" element={<Cart />} />
        
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

