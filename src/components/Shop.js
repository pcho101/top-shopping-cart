import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useHttp } from "../hooks/http";

const Shop = (props) => {
  const { addToCart, currencyFormat, hotGames, hotGamesLoading } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
  let params = useParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/search?query=";
  const searchId = searchParams.get("search") === null ? '' : searchParams.get("search");
  const [searchLoading, apiData] = useHttp(gameEndPoint + searchId, [params]);
  const sampleData = [
    {
      name: 'item1',
      id: 0,
      price: 20.50,
    },
    {
      name: 'item2',
      id: 1,
      price: 25.00,
    },
    {
      name: 'item3',
      id: 2,
      price: 5.00,
    },
    {
      name: 'item4',
      id: 3,
      price: 7.50,
    }
  ]
  const itemStyle = {
    height: "25vh",
    width: "20vh",
    border: "1px solid grey",
    backgroundColor: "lightblue"
  }
  const itemStyle2 = {
    height: "min-content",
    width: "min-content",
    border: "1px solid grey",
    backgroundColor: "lightblue"
  }
  const itemStyle3 = {
    height: "min-content",
    width: "90vw",
    border: "1px solid grey",
    backgroundColor: "lightblue"
  }
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr)"
  }
  const gridStyle2 = {
    display: "flex",
    flexDirection: "column"
  }

  let searchedGames = [];
  let searchResults = 0;

  if (apiData) {
    searchResults = apiData.getElementsByTagName("item").length;
    const itemLimit = Math.min(apiData.getElementsByTagName("item").length, 50)
    for (let i = 0; i < itemLimit; i++) {
      searchedGames[i] = {
        name: apiData.getElementsByTagName("name")[i].getAttribute("value"),
        type: apiData.getElementsByTagName("item")[i].getAttribute("type"),
        id: apiData.getElementsByTagName("item")[i].getAttribute("id")
      }
    }
    console.log('searchedGames', searchedGames);
  }

  const gameList = (
    searchParams.get("search")
    ? <div style={gridStyle2}>
      <div>
        Search Results: {searchResults}
      </div>
      { searchedGames.length > 0
      ? searchedGames
        .map((item, index) => (
        <div key={index} style={itemStyle3} onClick={() => navigate(`/product/${item.id}`)}>
          <h3>{item.name}</h3>
          <div>{item.type}</div>
        </div>
      ))
      : <div>
          <h1>No results found with search term: {searchParams.get("search")}</h1>
          <h2>Please try a different search term</h2>
        </div>
      }
    </div>
    : <div style={gridStyle}>
      { hotGames
      ? hotGames
        .filter((item) => {
          let filter = searchParams.get("filter");
          if (!filter) return true;
          let name = item.name.toLocaleLowerCase();
          return name.includes(filter.toLocaleLowerCase());
        })
        .map((item, index) => (
        <div key={index} style={itemStyle2} onClick={() => navigate(`/product/${item.id}`)}>
          <h3>{item.name}</h3>
          <img src={item.thumb}/>
        </div>
      ))
      : null }
    </div>
  )

  return (
    <div>
      <h1>Shop Page</h1>
      <input
        value={searchParams.get("filter") || ""}
        onChange={(event) => {
          let filter = event.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
      />
      { hotGamesLoading || searchLoading
      ? hotGamesLoading ? <h1>Loading games...</h1> : <h1>Loading search results...</h1> 
      : gameList}
      {sampleData
      .filter((item) => {
        let filter = searchParams.get("filter");
        if (!filter) return true;
        let name = item.name.toLocaleLowerCase();
        return name.includes(filter.toLocaleLowerCase());
      })
      .map((item) => (
        <div key={item.id} style={itemStyle} onClick={() => navigate(`/product/${item.id}`)}>
          <div>{item.name}</div>
          <div>{currencyFormat(item.price)}</div>
          <button onClick={()=>addToCart(item)}>Add to cart</button>
        </div>
      ))}
    </div>
  )
}

export default Shop;
