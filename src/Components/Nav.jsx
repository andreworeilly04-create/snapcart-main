import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { auth } from '../Firebase';
import '../App.css'
import './Nav.css';
import snapcart from '../assets/SnapCart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMoon, faUser, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from "../Firebase";
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const Nav = ({ toggleTheme, toggleMenu, cart=[], setIsLoggedIn, setCart}) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {

    try {
  
    await  logoutUser();
    
     setUser(null);

      setIsLoggedIn(false);

      setCart([]);

      localStorage.removeItem("user");
      localStorage.removeItem("snapcart_items");
      toast.success("Signed out!");
      navigate('/login');
  
    } catch (error) { 
      toast.error("Error logging out")
  }
};
 
  const totalItems = cart.reduce((total, item)=> {
    return total + item.quantity;
  }, 0);
  return (
    <>
      <section id="nav">
        <div className="nav__container">
          <figure className="logo">
           <Link to="/"><img className="logo__img" src={snapcart} alt="SnapCart Logo" /></Link>
          </figure>
          <ul className="profile__links">
            <li onClick={toggleTheme} className="profile__link--moon"><FontAwesomeIcon icon={faMoon} /></li>
            <Link className="user_link" to={user ? "/" : "/login"}><li className="profile__link"><FontAwesomeIcon icon={faUser} /></li>
          {user && ( <div className="login_dashboard--container">
              <p onClick={handleLogout} className="logout">Logout</p>
            </div>
          )}
            </Link>
            
            <Link className="cart_link" to="/cart"><li className="profile__link"><FontAwesomeIcon icon={faCartShopping} /> </li>
            {totalItems > 0 && ( <div className="cart_number--container">
              <p className="cart_number">{totalItems}</p>
            </div> 
            )}
           
            </Link>
           
          </ul>
          <ul className="dark--profile__links">
            <li onClick={toggleTheme} className="profile__link--sun"><FontAwesomeIcon icon={faSun} /></li>
             <Link className="user_link" to={user ? "/" : "/login"}><li className="profile__link"><FontAwesomeIcon icon={faUser} /></li>
          {user && ( <div className="login_dashboard--container">
              <p onClick={handleLogout} className="logout">Logout</p>
            </div>
          )}
      
          </Link>
           <Link className="cart_link" to="/cart"><li className="dark--profile__link"><FontAwesomeIcon icon={faCartShopping} />
            {totalItems > 0 && ( <div className="cart_number--container">
              <p className="cart_number">{totalItems}</p>
            </div> 
            )}
            </li>
            </Link>
           
          </ul>
          <ul className="nav__links">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}><li>Home</li></NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}><li>Products</li></NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}><li>About</li></NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}><li>Contact</li></NavLink>
          </ul>
          <div className="menu__btn">
            <FontAwesomeIcon onClick={toggleMenu} icon={faBars} />
          </div>
          <ul className="mobile__menu">
            <NavLink onClick={toggleMenu} to="/" className={({ isActive }) => (isActive ? "mobile__menu--link active" : "mobile__menu--link")}><li>Home</li></NavLink>
            <NavLink onClick={toggleMenu} to="/products" className={({ isActive }) => (isActive ? "mobile__menu--link active" : "mobile__menu--link")}><li>Products</li></NavLink>
            <NavLink onClick={toggleMenu} to="/about" className={({ isActive }) => (isActive ? "mobile__menu--link active" : "mobile__menu--link")}><li>About</li></NavLink>
            <NavLink onClick={toggleMenu} to="/contact" className={({ isActive }) => (isActive ? "mobile__menu--link active" : "mobile__menu--link")}><li>Contact</li></NavLink>
            <li onClick={toggleMenu} className="times__icon"><FontAwesomeIcon icon={faTimes} /></li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Nav;