import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import './Nav.css';
import snapcart from '../assets/SnapCart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMoon, faUser, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
const Nav = ({ toggleTheme, toggleMenu, cart=[] }) => {

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
            <li className="profile__link"><FontAwesomeIcon icon={faUser} /></li>
            <Link className="cart_link" to="/cart"><li className="profile__link"><FontAwesomeIcon icon={faCartShopping} />
            {totalItems > 0 && ( <div className="cart_number--container">
              <p className="cart_number">{totalItems}</p>
            </div> 
            )}
            </li>
            </Link>
           
          </ul>
          <ul className="dark--profile__links">
            <li onClick={toggleTheme} className="profile__link--sun"><FontAwesomeIcon icon={faSun} /></li>
            <li className="dark--profile__link"><FontAwesomeIcon icon={faUser} /></li>
           <Link className="cart_link" to="/cart"><li className="dark--profile__link"><FontAwesomeIcon icon={faCartShopping} />
            {totalItems > 0 && ( <div className="cart_number--container">
              <p className="cart_number">{totalItems}</p>
            </div> 
            )}
            </li>
            </Link>
           
          </ul>
          <ul className="nav__links">
            <Link to="/"><li className="nav__link">Home</li></Link>
            <Link to="/products"><li className="nav__link">Products</li></Link>
            <Link to="/about"><li className="nav__link">About</li></Link>
            <Link to="/contact"><li className="nav__link">Contact</li></Link>
          </ul>
          <div className="menu__btn">
            <FontAwesomeIcon onClick={toggleMenu} icon={faBars} />
          </div>
          <ul className="mobile__menu">
            <Link to="/"><li className="mobile__menu--link">Home</li></Link>
            <Link to="/products"><li className="mobile__menu--link">Products</li></Link>
            <Link to="/about"><li className="mobile__menu--link">About</li></Link>
            <Link to="/contact"><li className="mobile__menu--link">Contact</li></Link>
            <li onClick={toggleMenu} className="times__icon"><FontAwesomeIcon icon={faTimes} /></li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Nav;