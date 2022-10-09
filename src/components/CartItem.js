import { useNavigate } from "react-router-dom";
import currencyFormat from "../helpers/currencyFormat";

const CartItem = (props) => {
  const navigate = useNavigate();
  const { item, removeFromCart, addToCart, decFromCart } = props;

  return (
    <div data-testid="cart-item" className="cart-item">
      <div className="cart-img">
        <img
          src={item.thumb}
          onClick={() => navigate(`/product/${item.id}`)}
          alt={item.name}
        />
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
  )
}

export default CartItem;
