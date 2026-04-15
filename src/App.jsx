import React, { useState, useEffect } from 'react';
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
import Login from './Pages/Login.jsx';
import { db } from "./Firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveUserCart } from './Firebase'
import { getUserCart } from './Firebase'

function App() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  });

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('snapcart_items');
    return localData ? JSON.parse(localData) : [];
  });

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');


    if (storedUser && storedUser !== "undefined") {

      try {

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);

        const loadFirebaseCart = async () => {

          const savedCart = await getUserCart(parsedUser.uid);
        
            setCart(savedCart || []);
          setIsInitialLoad(false);
        };

        loadFirebaseCart();

      } catch (err) {
        console.error("Failed to load cart", err);
        setIsInitialLoad(false);

      }

    } else {
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('snapcart_items', JSON.stringify(cart));


    if (!isInitialLoad && isLoggedIn && user?.uid && cart.length > 0) {
      saveUserCart(user.uid, cart);
    }
  }, [cart, user, isLoggedIn, isInitialLoad]);



  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => String(item.id) === String(product.id) && item.size === product.size);

      if (existing) {
        return prevCart.map((item) =>
          String(item.id) === String(product.id) && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };


    useEffect(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }, [theme]);
  
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

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const savedCart = await getDoc(doc(db, "carts", user.uid));
        if (savedCart.exists()) setCart(savedCart.data().items)
      };
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  return (
    <div className={`app ${theme} ${isMenuOpen ? 'menu--open' : ''}`}>
      <Nav user={user} setCart={setCart} toggleTheme={toggleTheme} toggleMenu={toggleMenu} cart={cart} setIsLoggedIn={setIsLoggedIn} />
      <ToastContainer />
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
              cart={cart}
              isLoggedIn={isLoggedIn}
            />

          }
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCart={setCart} setUser={setUser} />} />
      </Routes>



      <Footer />
    </div>
  );
}

export default App;