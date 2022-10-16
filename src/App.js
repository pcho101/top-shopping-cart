import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import Product from "./pages/Product";
import { useEffect, useState } from "react";
import { useHttp } from "./hooks/http";
import "./styles/App.css";
import parseApiData from "./helpers/parseApiData";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);
  const [cartActive, setCartActive] = useState(false);
  const [hotGamesLoading, apiData] = useHttp("https://boardgamegeek.com/xmlapi2/hot?boardgame", []);
  const [hotGames, setHotGames] = useState([]);

  useEffect(() => {
    setHotGames(parseApiData(apiData, "app"));
  }, [apiData])

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
      <Nav clickHandler={toggleCart} cartItems={cart}/>
      {cartActive
        ? <Cart
          clickHandler={toggleCart}
          cartItems={cart}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          decFromCart={decFromCart}
          toggleCart={toggleCart}
        />
        : null}
      <Routes>
        <Route path="/" element={<Home hotGames={hotGames}/>} />
        <Route
          path="/shop"
          element={
            <Shop
              addToCart={addToCart}
              hotGames={hotGames}
              hotGamesLoading={hotGamesLoading}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={<Product addToCart={addToCart} />}
        />
        <Route
          path="*"
          element={
            <main>
              <h1>Page Not Found</h1>
            </main>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
