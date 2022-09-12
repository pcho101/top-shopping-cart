import { Link } from "react-router-dom";

const Nav = (props) => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eaeaea"
  }
  const navItemStyle = {
    display: "flex",
    gap: "50px"
  }
  const { clickHandler, cartItems } = props;
  const items = cartItems
    ? cartItems.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)
    : 0;
  return (
    <nav style={navStyle}>
      <h3>Logo</h3>
      <ul style={navItemStyle}>
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
