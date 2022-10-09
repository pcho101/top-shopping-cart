import { useNavigate } from "react-router-dom";

const Results = (props) => {
  const { searchResults, searchedGames, filterValue, searchTerm } = props;
  const navigate = useNavigate();

  return (
    <div className="searchedgames">
      <div className="searchresult">
        Search Results: {searchResults}
      </div>
      {searchedGames.length > 0
        ? searchedGames
          .filter((item) => {
            if (!filterValue) return true;
            let name = item.name.toLocaleLowerCase();
            return name.includes(filterValue.toLocaleLowerCase());
          })
          .map((item, index) => (
          <div
            key={index}
            className="searchedgamesitem"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <h3>{item.name}</h3>
            <div>{item.type}</div>
          </div>
          ))
        : <div>
            <h1>No results found with search term: {searchTerm}</h1>
            <h2>Please try a different search term</h2>
          </div>
      }
    </div>
  )
}

export default Results;
