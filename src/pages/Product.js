import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http";
import parseApiData from "../helpers/parseApiData";

const Product = (props) => {
  const { addToCart } = props;
  const params = useParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  const itemId = parseInt(params.productId, 10);
  const [productLoading, apiData] = useHttp(gameEndPoint + itemId, [params.productId]);

  const currencyFormat = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const markup = (string) => {
    return {__html: string};
  }

  let game = parseApiData(apiData, "product", itemId);
  console.log('product re-renders');

  const productPage = (
    game
    ? (
      <div className="product-info">
        <h1>{game.name}</h1>
        <img src={game.image}/>
        <h2>{currencyFormat(game.price)}</h2>
        <button onClick={()=>addToCart(game)}>Add to cart</button>
        <p dangerouslySetInnerHTML={markup(game.desc)}></p>
      </div>
    )
    : null
  )

  return (
    <div className="product">
      { productLoading
      ? <h1>Product loading...</h1>
      : productPage}
    </div>
  )
}

export default Product;