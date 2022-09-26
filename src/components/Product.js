import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http";

const Product = (props) => {
  const { addToCart } = props;
  const params = useParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  const itemId = parseInt(params.productId, 10);
  const [productLoading, apiData] = useHttp(gameEndPoint + itemId, [params.productId]);
  
  const priceById = (id) => {
    return Math.max(Math.round(Number(id) / 100), 1000) / 100;
  }

  const currencyFormat = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const markup = (string) => {
    return {__html: string};
  }

  let game = null;
  console.log('product re-renders');
  
  if (apiData) {
    console.log(apiData);
    game = {
      id: apiData.getElementsByTagName("item")[0].getAttribute("id"),
      name: apiData.getElementsByTagName("name")[0].getAttribute("value"),
      image: apiData.getElementsByTagName("image")[0].childNodes[0].nodeValue,
      thumb: apiData.getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue,
      desc: apiData.getElementsByTagName("description")[0].childNodes[0].nodeValue,
      price: priceById(itemId)
    };
  }

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
