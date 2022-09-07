import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [cartActive, setCardActive] = useState(false);

  const toggleCart = () => {
    setCardActive(!cartActive);
  }

  return (
    <BrowserRouter>
      <Nav clickHandler={toggleCart} />
      { cartActive ? <Cart clickHandler={toggleCart} /> : null }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
