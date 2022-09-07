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
  const { clickHandler } = props;
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
        <li><button onClick={clickHandler}>Cart</button></li>
      </ul>
    </nav>
  )
}

export default Nav;
