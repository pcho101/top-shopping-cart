import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const { clickHandler, cartItems, removeFromCart, addToCart, decFromCart } = props;

  const currencyFormat = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const cartStyle = {
    height: "100vh",
    width: "40vw",
    border: "2px solid black",
    right: "0",
    top: "0",
    position: "fixed",
    backgroundColor: "#efefef"
  }

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
      <div style={{ height: "100%" }}>
        {cartItems.map((item) => (
          <div key={item.id}>
            <div style={{ display: "flex" }}>
              <div>
                <img src={item.thumb} onClick={() => navigate(`/product/${item.id}`)}/>
              </div>
              <div>
                <div>Quantity: {item.quantity}</div>
                <div>Name: {item.name}</div>
                <div>Price/unit: {currencyFormat(item.price)}</div>
                <div>Total: {currencyFormat(item.quantity*item.price)}</div>
              </div>
            </div>
            <button onClick={()=>addToCart(item)}>+</button>
            <button onClick={()=>decFromCart(item.id)}>-</button>
            <button onClick={()=>removeFromCart(item.id)}>Remove from cart</button>
          </div>
        ))}
      </div>
      <h2>Items:{items}</h2>
      <h2>Subtotal:{currencyFormat(subtotal)}</h2>
      <h2>Continue Browsing</h2>
    </div>
  )
}

export default Cart;
