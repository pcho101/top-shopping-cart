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
  const { clickHandler, cartItems, removeFromCart, addToCart, decFromCart, currencyFormat } = props;
  const items = cartItems
    ? cartItems.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)
    : 0;
  const subtotal = cartItems
    ? cartItems.map((item) => item.price*item.quantity).reduce((prev, cur) => prev + cur, 0)
    : 0;
  return (
    <div style={cartStyle}>
      <h1>My Items</h1>
      <button onClick={clickHandler}>X</button>
      {cartItems.map((item) => (
        <div key={item.id}>
          <div>Quantity: {item.quantity}</div>
          <div>Name: {item.name}</div>
          <div>Price/unit: {currencyFormat(item.price)}</div>
          <div>Total: {currencyFormat(item.quantity*item.price)}</div>
          <button onClick={()=>addToCart(item)}>+</button>
          <button onClick={()=>decFromCart(item.id)}>-</button>
          <button onClick={()=>removeFromCart(item.id)}>Remove from cart</button>
        </div>
      ))}
      <h2>Items:{items}</h2>
      <h2>Subtotal:{currencyFormat(subtotal)}</h2>
      <h2>Continue Browsing</h2>
    </div>
  )
}

export default Cart;
