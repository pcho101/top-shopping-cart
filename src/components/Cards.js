import { useNavigate } from "react-router-dom";
import currencyFormat from "../helpers/currencyFormat";

const Cards = (props) => {
  const { hotGames, filterValue, addToCart } = props;
  const navigate = useNavigate();

  return (
    <div className="hotgames">
      {hotGames
        ? hotGames
            .filter((item) => {
              if (!filterValue) return true;
              let name = item.name.toLocaleLowerCase();
              return name.includes(filterValue.toLocaleLowerCase());
            })
            .map((item, index) => (
              <div
                key={index}
                className="hotgamesitem"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.thumb} alt={item.name}/>
                <h3>{item.name}</h3>
                <h4>{currencyFormat(item.price)}</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  Add to cart
                </button>
              </div>
            ))
        : null}
    </div>
  )
}

export default Cards;
