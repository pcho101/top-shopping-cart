import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const { clickHandler, cartItems, removeFromCart, addToCart, decFromCart, toggleCart } = props;

  const currencyFormat = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

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
        }}>Browse Shop</button>
        : null}
        {cartItems.map((item) => (
          <div key={item.id} data-testid="cart-item" className="cart-item">
            <div className="cart-img">
              <img src={item.thumb} onClick={() => navigate(`/product/${item.id}`)}/>
            </div>
            <div className="cart-info">
              <div className="cart-info-header">
                <div className="cart-item-name">{item.name}</div>
                <button onClick={()=>removeFromCart(item.id)}>X</button>
              </div>
              <div className="cart-item-unit-price">{currencyFormat(item.price)}</div>
              <div className="cart-info-main">
                <div className="cart-info-qty">
                  <button onClick={()=>decFromCart(item.id)}>-</button>
                  <div className="item-qty">{item.quantity}</div>
                  <button onClick={()=>addToCart(item)}>+</button>
                </div>
                <div className="cart-item-price">{currencyFormat(item.quantity*item.price)}</div>
              </div>
            </div>
          </div>
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
