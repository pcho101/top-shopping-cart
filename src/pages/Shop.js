import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useHttp } from "../hooks/http";
import parseApiData from "../helpers/parseApiData";
import Cards from "../components/Cards";
import Results from "../components/Results";

const Shop = (props) => {
  const { addToCart, hotGames, hotGamesLoading } = props;
  const [searchParams] = useSearchParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/search?query=";
  const searchId = searchParams.get("search") === null ? '' : searchParams.get("search");
  const [searchLoading, apiData] = useHttp(gameEndPoint + searchId, [searchParams.get("search")]);
  const [filterValue, setFilterValue] = useState('');

  let [searchedGames, searchResults] = parseApiData(apiData, "search");

  const gameList = searchParams.get("search")
    ? <Results
        searchResults={searchResults}
        searchedGames={searchedGames}
        filterValue={filterValue}
        searchTerm={searchParams.get("search")}
      />
    : <Cards
        hotGames={hotGames}
        filterValue={filterValue}
        addToCart={addToCart}
      />

  return (
    <div className="shop">
      <h1>Collection</h1>
      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Filter Items"
      />
      {hotGamesLoading || (searchLoading && searchParams.get("search"))
        ? hotGamesLoading
          ? <h1>Loading games...</h1>
          : <h1>Loading search results...</h1> 
        : gameList}
    </div>
  )
}

export default Shop;
