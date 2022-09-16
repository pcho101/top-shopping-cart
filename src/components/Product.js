import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = (props) => {
  const { addToCart, currencyFormat } = props;
  const [fetchedData, setFetchedData] = useState(null);
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
  let params = useParams();
  const gameEndPoint = "https://boardgamegeek.com/xmlapi2/thing?id=";
  const itemId = parseInt(params.productId, 10);

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
    getData(gameEndPoint+itemId);
  }, [])

  let game = null;
  
  if (fetchedData) {
    game = {
      name: fetchedData.getElementsByTagName("name")[0].getAttribute("value"),
      image: fetchedData.getElementsByTagName("image")[0].childNodes[0].nodeValue
    };
  }
  console.log('product page renders', game)

  // const item = sampleData.find((item) => item.id === parseInt(params.productId, 10))
  return (
    // <div>
    //   <h1>Product: {params.productId}</h1>
    //   <h3>{item.name}</h3>
    //   <h3>{currencyFormat(item.price)}</h3>
    //   <button onClick={()=>addToCart(item)}>Add to cart</button>
    // </div>
    <div>
      { game
      ? (
        <div>
          <h1>{game.name}</h1>
          <img src={game.image} style={{ width: "80vh", height: "50vh" }}/>
        </div>
      )
      : null }
    </div>
  )
}

export default Product;
