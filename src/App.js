import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([
    {
      name: 'item1',
      id: 0,
      price: 20.00,
    }
  ]);
  const [cartActive, setCardActive] = useState(false);

  const toggleCart = () => {
    setCardActive(!cartActive);
  }

  const addToCart = (newItem) => {
    setCart([...cart, newItem]);
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  return (
    <BrowserRouter>
      <Nav clickHandler={toggleCart} />
      { cartActive ? <Cart clickHandler={toggleCart} cartItems={cart} removeFromCart={removeFromCart}/> : null }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
