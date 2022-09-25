import { Link } from "react-router-dom";
import Search from "./Search";

const Nav = (props) => {
  const { clickHandler, cartItems } = props;

  const items = cartItems
    ? cartItems.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)
    : 0;

  return (
    <nav>
      <h3>Logo</h3>
      <Search />
      <ul className="navitem">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/shop">
          <li>Shop</li>
        </Link>
        <li><button onClick={clickHandler}>Cart</button><span>{items}</span></li>
      </ul>
    </nav>
  )
}

export default Nav;
