import { useHttp } from "../hooks/http";
import "../styles/App.css";

const Home = (props) => {
  const { hotGames } = props;
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  
  const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  console.log('render home');
  const gameIds = getMultipleRandom(hotGames, 3).map((item) => item.id).join(',');

  const [gameLoading, apiData] = useHttp(gameEndPoint + gameIds, []);

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

  const imgStyle = {
    height: "300px",
    width: "500px",
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div className="slider">
        <span id="slide-1"></span>
        <span id="slide-2"></span>
        <span id="slide-3"></span>
        { games.length > 0 &&
        <div className="image-container">
          <img src={games[0].image} style={imgStyle}></img>
          <img src={games[1].image} style={imgStyle}></img>
          <img src={games[2].image} style={imgStyle}></img>
        </div>
        }
        <div className="buttons">
          <a href="#slide-1"></a>
          <a href="#slide-2"></a>
          <a href="#slide-3"></a>
        </div>
      </div>
      
    </div>
  )
}

export default Home;
