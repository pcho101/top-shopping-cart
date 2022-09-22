import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { useState } from "react";
import { useHttp } from "./hooks/http";

function App() {
  const [cart, setCart] = useState([]);
  const [cartActive, setCartActive] = useState(false);
  const [hotGamesLoading, apiData] = useHttp("https://boardgamegeek.com/xmlapi2/hot?boardgame", []);

  const priceById = (id) => {
    return Math.max(Math.round(Number(id) / 100), 1000) / 100;
  }

  let hotGames = [];

  if (apiData) {
    let hotGamesItems = apiData.getElementsByTagName("item");
    let hotGamesNames = apiData.getElementsByTagName("name");
    let hotGamesThumbs = apiData.getElementsByTagName("thumbnail");
    hotGamesItems = Array.from(hotGamesItems);
    hotGamesNames = Array.from(hotGamesNames);
    hotGamesThumbs = Array.from(hotGamesThumbs);
    const gameId = hotGamesItems.map(element => ({
      id: element.id,
      price: priceById(element.id)
    }))
    const gameName = hotGamesNames.map(element => ({
      name: element.attributes[0].nodeValue
    }))
    const gameThumb = hotGamesThumbs.map(element => ({
      thumb: element.attributes[0].nodeValue
    }))
    for (let i = 0; i < hotGamesNames.length; i++) {
      hotGames.push(
        { ...gameId[i], ...gameName[i], ...gameThumb[i] }
      )
    }
    console.log(hotGames);
  }
  
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
      { cartActive
      ? <Cart
        clickHandler={toggleCart}
        cartItems={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        decFromCart={decFromCart}
      />
      : null }
      <Routes>
        <Route path="/" element={<Home hotGames={hotGames}/>} />
        <Route path="/shop" element={<Shop
          addToCart={addToCart}
          hotGames={hotGames}
          hotGamesLoading={hotGamesLoading}/>}
        />
        <Route path="/product/:productId" element={<Product
          addToCart={addToCart} />}
        />
        <Route path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Page Not Found</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
