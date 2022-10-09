import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import currencyFormat from "../helpers/currencyFormat";

const Cart = (props) => {
  const navigate = useNavigate();
  const { clickHandler, cartItems, removeFromCart, addToCart, decFromCart, toggleCart } = props;

  const items = cartItems
    ? cartItems.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)
    : 0;
  
  const subtotal = cartItems
    ? cartItems.map((item) => item.price*item.quantity).reduce((prev, cur) => prev + cur, 0)
    : 0;

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>My Items ({items})</h1>
        <button onClick={clickHandler}>X</button>
      </div>
      <div className="cart-main">
        {items === 0
          ? <button onClick={() => {
              toggleCart();
              navigate(`/shop`)
            }}>
              Browse Shop
            </button>
          : null}
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            decFromCart={decFromCart}
          />
        ))}
      </div>
      <div className="cart-footer">
        <h5>Subtotal
          <span data-testid="subtotal">{currencyFormat(subtotal)}</span>
        </h5>
        <h5>Taxes
          <span data-testid="taxes">{currencyFormat(0)}</span>
        </h5>
        <h6>Total
          <span data-testid="total">{currencyFormat(subtotal)}</span>
        </h6>
        <div className="checkout">
          <button>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;
