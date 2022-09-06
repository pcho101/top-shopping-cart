import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{ display: "flex" }}>
      <h3>Logo</h3>
      <ul style={{ display: "flex" }}>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/shop">
          <li>Shop</li>
        </Link>
        <li>Cart</li>
      </ul>
    </nav>
  )
}

export default Nav;
