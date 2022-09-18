import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Shop = (props) => {
  const { addToCart, currencyFormat, hotGames } = props;
  const [fetchedData, setFetchedData] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
  let params = useParams();
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

  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/search?query=";
  const searchId = searchParams.get("search") === undefined ? '' : searchParams.get("search");

  useEffect(() => {
    const getData = async (url) => {
      console.log('Sending api request')
      try {
        const response = await fetch(url);
        console.log('resp', response)
        const data = await response.text();
        const xml = new DOMParser().parseFromString(data, 'application/xml');
        if (!response.ok) {
          throw new Error('Failed to fetch.')
        }
        setFetchedData(xml);
        // setIsLoading(false);
      }
      catch(err) {
        console.log('Error!', err);
        // setIsLoading(false);
      }  
    }
    if (searchId) getData(gameEndPoint + searchId);
  }, [params])

  let searchedGames = [];
  let searchResults = 0;

  if (fetchedData) {
    searchResults = fetchedData.getElementsByTagName("item").length;
    const itemLimit = Math.min(fetchedData.getElementsByTagName("item").length, 50)
    for (let i = 0; i < itemLimit; i++) {
      searchedGames[i] = {
        name: fetchedData.getElementsByTagName("name")[i].getAttribute("value"),
        type: fetchedData.getElementsByTagName("item")[i].getAttribute("type"),
        id: fetchedData.getElementsByTagName("item")[i].getAttribute("id")
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
      {gameList}
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
