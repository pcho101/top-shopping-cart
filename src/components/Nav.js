import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const Nav = (props) => {
  const { clickHandler, cartItems } = props;
  const location = useLocation();

  const items = cartItems
    ? cartItems.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)
    : 0;

  return (
    <nav>
      <h1 className="logo">Logo</h1>
      <Search />
      <ul className="navitem">
        <Link to="/" className={location.pathname === '/' ? "active" : null}>
          <li>Home</li>
        </Link>
        <Link to="/shop" className={location.pathname === '/shop' ? "active" : null}>
          <li>Shop</li>
        </Link>
        <li onClick={clickHandler} className="cart-nav">
          Cart 
          <span data-testid="cart-count" className="cart-count">{items}</span>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
