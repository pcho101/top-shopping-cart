import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useHttp } from "../hooks/http";
import parseApiData from "../helpers/parseApiData";

const Shop = (props) => {
  const { addToCart, hotGames, hotGamesLoading } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/search?query=";
  const searchId = searchParams.get("search") === null ? '' : searchParams.get("search");
  const [searchLoading, apiData] = useHttp(gameEndPoint + searchId, [searchParams.get("search")]);
  const [filterValue, setFilterValue] = useState('');

  const currencyFormat = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  let searchedGames;
  let searchResults;

  [ searchedGames, searchResults ] = parseApiData(apiData, "search");
  console.log('shop re-renders')

  const gameList = (
    searchParams.get("search")
    ? <div className="searchedgames">
      <div className="searchresult">
        Search Results: {searchResults}
      </div>
      { searchedGames.length > 0
      ? searchedGames
        .filter((item) => {
          if (!filterValue) return true;
          let name = item.name.toLocaleLowerCase();
          return name.includes(filterValue.toLocaleLowerCase());
        })
        .map((item, index) => (
        <div key={index} className="searchedgamesitem" onClick={() => navigate(`/product/${item.id}`)}>
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
    : <div className="hotgames">
      { hotGames
      ? hotGames
        .filter((item) => {
          if (!filterValue) return true;
          let name = item.name.toLocaleLowerCase();
          return name.includes(filterValue.toLocaleLowerCase());
        })
        .map((item, index) => (
        <div key={index} className="hotgamesitem" onClick={() => navigate(`/product/${item.id}`)}>
          <img src={item.thumb}/>
          <h3>{item.name}</h3>
          <h4>{currencyFormat(item.price)}</h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}>
            Add to cart
          </button>
        </div>
      ))
      : null }
    </div>
  )

  return (
    <div className="shop">
      <h1>Collection</h1>
      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Filter Items"
      />
      { hotGamesLoading || (searchLoading && searchParams.get("search"))
      ? hotGamesLoading ? <h1>Loading games...</h1> : <h1>Loading search results...</h1> 
      : gameList}
    </div>
  )
}

export default Shop;
