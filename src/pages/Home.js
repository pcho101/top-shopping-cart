import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http";
import parseApiData from "../helpers/parseApiData";

const Home = (props) => {
  const { hotGames } = props;
  const navigate = useNavigate();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  
  const getMultipleRandom = (arr, num) => {
    if(arr === undefined) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  console.log('render home');
  const gameIds = getMultipleRandom(hotGames, 3).map((item) => item.id).join(',');

  const [gameLoading, apiData] = useHttp(gameEndPoint + gameIds, [hotGames]);
  const [radioIndex, setRadioIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const toggleActive = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        console.log('radio inc', radioIndex);
        if (radioIndex === 2) setRadioIndex(0)
        else setRadioIndex(radioIndex => radioIndex + 1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isActive, radioIndex])

  let games = parseApiData(apiData, "home");

  return (
    <div className="home">
      <h1>Featured Games</h1>
      <div className="container">
        <input type="radio" name="slider" id="item-1" checked={radioIndex === 0} readOnly/>
        <input type="radio" name="slider" id="item-2" checked={radioIndex === 1} readOnly/>
        <input type="radio" name="slider" id="item-3" checked={radioIndex === 2} readOnly/>
        { games.length > 0 && 
        <div className="cards">
          <label className="card" htmlFor="item-1" id="game-1">
            <img src={games[0].image} onClick={() => navigate(`/product/${games[0].id}`)} alt="game-1"></img>
          </label>
          <label className="card" htmlFor="item-2" id="game-2">
            <img src={games[1].image} onClick={() => navigate(`/product/${games[1].id}`)} alt="game-2"></img>
          </label>
          <label className="card" htmlFor="item-3" id="game-3">
            <img src={games[2].image} onClick={() => navigate(`/product/${games[2].id}`)} alt="game-3"></img>
          </label>
        </div>
        }
        <button className="btn-animate" onClick={() => toggleActive()}>
          { isActive ? "PAUSE" : "PLAY" }
        </button>
      </div>
      
    </div>
  )
}

export default Home;
