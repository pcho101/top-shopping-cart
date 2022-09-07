const Cart = (props) => {
  const cartStyle = {
    height: "100vh",
    width: "40vw",
    border: "2px solid black",
    right: "0",
    top: "0",
    position: "fixed",
    backgroundColor: "#efefef"
  }
  const { clickHandler } = props;
  return (
    <div style={cartStyle}>
      <h1>My Items</h1>
      <button onClick={clickHandler}>X</button>
      <h2>Continue Browsing</h2>
    </div>
  )
}

export default Cart;
