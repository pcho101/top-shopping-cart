import { useEffect, useState } from "react";
import { useHttp } from "../hooks/http";
import parseApiData from "../helpers/parseApiData";
import Carousel from "../components/Carousel";

const Home = (props) => {
  const { hotGames } = props;
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
      {gameLoading
        ? <h1>Loading...</h1>
        : <Carousel
            radioIndex={radioIndex}
            games={games}
            toggleActive={toggleActive}
            isActive={isActive}
          />
      }
    </div>
  )
}

export default Home;
