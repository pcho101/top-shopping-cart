import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http";
import "../styles/App.css";

const Home = (props) => {
  const { hotGames } = props;
  const navigate = useNavigate();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  
  const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  console.log('render home');
  const gameIds = getMultipleRandom(hotGames, 3).map((item) => item.id).join(',');

  const [gameLoading, apiData] = useHttp(gameEndPoint + gameIds, []);
  const [radioIndex, setRadioIndex] = useState(0);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      console.log('radio inc', radioIndex);
      if (radioIndex === 2) setRadioIndex(0)
      else setRadioIndex(radioIndex => radioIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [radioIndex])

  let games = [];

  if (apiData) {
    console.log(apiData);
    const numberOfItems = apiData.getElementsByTagName("item").length;
    const gameItems = apiData.getElementsByTagName("item").length > 0
      ? apiData.getElementsByTagName("item")
      : null
    const gameImages = apiData.getElementsByTagName("image").length > 0
      ? apiData.getElementsByTagName("image")
      : null
    for (let i = 0; i < numberOfItems; i++) {
      games[i] = {
        id: gameItems[i].getAttribute("id"),
        image: gameImages[i].childNodes[0].nodeValue
      }
    }
    console.log(games);
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div className="container">
        <input type="radio" name="slider" id="item-1" checked={radioIndex === 0}/>
        <input type="radio" name="slider" id="item-2" checked={radioIndex === 1}/>
        <input type="radio" name="slider" id="item-3" checked={radioIndex === 2}/>
        { games.length > 0 && 
        <div className="cards">
          <label className="card" htmlFor="item-1" id="game-1">
            <img src={games[0].image} onClick={() => navigate(`/product/${games[0].id}`)} alt="game-1"></img>
          </label>
          <label className="card" htmlFor="item-2" id="game-2">
            <img src={games[1].image} onClick={() => navigate(`/product/${games[0].id}`)} alt="game-2"></img>
          </label>
          <label className="card" htmlFor="item-3" id="game-3">
            <img src={games[2].image} onClick={() => navigate(`/product/${games[0].id}`)} alt="game-3"></img>
          </label>
        </div>
        }
      </div>
      
    </div>
  )
}

export default Home;
