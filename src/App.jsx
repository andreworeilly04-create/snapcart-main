import React, { useState } from 'react';
import Products from './Pages/Products.jsx';
import Product from './Pages/Product.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import Nav from './Components/Nav.jsx';
import Header from './Components/Header.jsx';
import Features from './Components/Features.jsx';
import Recommended from './Components/Recommended.jsx';
import Footer from './Components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import { AllProducts } from './data.js';
import Cart from './Pages/Cart.jsx';

function App() {
  const [cart, setCart] = useState([]);

   

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id && item.size === product.size);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const [isInputOpen, setIsInputOpen] = useState(false);
  const toggleSearch = () => setIsInputOpen((prev) => !prev);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  
  return (
    <div className={`app ${theme} ${isMenuOpen ? 'menu--open' : ''}`}>
      <Nav toggleTheme={toggleTheme} toggleMenu={toggleMenu} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Features />
              <Recommended />
            </>
          }
        />

        <Route
          path="/products"
          element={
            <Products
              isInputOpen={isInputOpen}
              toggleSearch={toggleSearch}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/product/:productId"
          element={
            <Product
              AllProducts={AllProducts}
              addToCart={addToCart}
            />
            
          }
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;