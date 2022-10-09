import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http";
import parseApiData from "../helpers/parseApiData";
import currencyFormat from "../helpers/currencyFormat";

const Product = (props) => {
  const { addToCart } = props;
  const params = useParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  const itemId = parseInt(params.productId, 10);
  const [productLoading, apiData] = useHttp(gameEndPoint + itemId, [params.productId]);

  const markup = (string) => {
    return {__html: string};
  }

  let game = parseApiData(apiData, "product", itemId);
  console.log('product re-renders');

  const productPage = game
    ? <div className="product-info">
        <h1>{game.name}</h1>
        <img src={game.image} alt={game.name}/>
        <h2>{currencyFormat(game.price)}</h2>
        <button onClick={()=>addToCart(game)}>Add to cart</button>
        <p dangerouslySetInnerHTML={markup(game.desc)}></p>
      </div>
    : <div>
        <h1>Product not found</h1>
      </div>


  return (
    <div className="product">
      {productLoading ? <h1>Product loading...</h1> : productPage}
    </div>
  )
}

export default Product;
