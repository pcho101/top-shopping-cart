import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [cartActive, setCartActive] = useState(false);

  const toggleCart = () => {
    setCartActive(!cartActive);
  }

  const addToCart = (newItem) => {
    const index = cart.findIndex(item => item.id === newItem.id);
    if (index > -1) {
      const newCart = [...cart];
      newCart[index].quantity = newCart[index].quantity + 1;
      setCart(newCart);
    } else {
      const itemWithQty = newItem;
      itemWithQty.quantity = 1;
      setCart([...cart, itemWithQty]);
    }
  }

  const decFromCart = (id) => {
    const index = cart.findIndex(item => item.id === id);
    if (cart[index].quantity === 1) {
      setCart(cart.filter((item) => item.id !== id))
    } else {
      const newCart = [...cart];
      newCart[index].quantity = newCart[index].quantity - 1;
      setCart(newCart);
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  return (
    <BrowserRouter>
      <Nav clickHandler={toggleCart} />
      { cartActive
      ? <Cart
        clickHandler={toggleCart}
        cartItems={cart}
        removeFromCart={removeFromCart}
        decFromCart={decFromCart}
      />
      : null }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
