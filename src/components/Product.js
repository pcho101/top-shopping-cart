import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http";

const Product = (props) => {
  const { addToCart } = props;
  const params = useParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  const itemId = parseInt(params.productId, 10);
  const [productLoading, apiData] = useHttp(gameEndPoint + itemId, []);
  
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
      <div>
        <h1>{game.name}</h1>
        <img src={game.image} style={{ width: "80vh", height: "50vh" }}/>
        <h2>{currencyFormat(game.price)}</h2>
        <button onClick={()=>addToCart(game)}>Add to cart</button>
        <h3 dangerouslySetInnerHTML={markup(game.desc)}></h3>
      </div>
    )
    : null
  )

  return (
    <div>
      { productLoading
      ? <h1>Product loading...</h1>
      : productPage}
    </div>
  )
}

export default Product;
