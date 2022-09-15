import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [cartActive, setCartActive] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      // setIsLoading(true);
      console.log('Sending api request')
      try {
        const response = await fetch("https://boardgamegeek.com/xmlapi2/hot?boardgame");
        console.log('resp', response)
        const data = await response.text();
        const xml = new DOMParser().parseFromString(data, 'application/xml');
        console.log('xml', xml);
        if (!response.ok) {
          throw new Error('Failed to fetch.')
        }
        setFetchedData(xml);
        console.log('fetched xml', xml);
        // setIsLoading(false);
      }
      catch(err) {
        console.log('Error!', err);
        // setIsLoading(false);
      }
    }
    getData();
    console.log(fetchedData);
  }, [])

  let games = null;

  if (fetchedData) {
    let hotGamesNames = fetchedData.getElementsByTagName("name");
    let hotGamesThumbs = fetchedData.getElementsByTagName("thumbnail");
    hotGamesNames = Array.from(hotGamesNames);
    hotGamesThumbs = Array.from(hotGamesThumbs);
    const gameName = hotGamesNames.map(element =>
      ({ name: element.attributes[0].nodeValue }))
    const gameThumb = hotGamesThumbs.map(element =>
      ({ thumb: element.attributes[0].nodeValue }))
    games = [];
    for (let i = 0; i < hotGamesNames.length; i++) {
      games.push(
        { ...gameName[i], ...gameThumb[i] }
      )
    }
    console.log(games);
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

  const currencyFormat = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
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
        currencyFormat={currencyFormat}
      />
      : null }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop
          addToCart={addToCart}
          currencyFormat={currencyFormat}
          games={games}/>}
        />
        <Route path="/product/:productId" element={<Product
          addToCart={addToCart}
          currencyFormat={currencyFormat} />}
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
