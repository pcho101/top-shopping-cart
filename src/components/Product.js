import { useParams } from "react-router-dom";

const Product = (props) => {
  const { addToCart, currencyFormat } = props;
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
  const item = sampleData.find((item) => item.id === parseInt(params.productId, 10))
  return (
    <div>
      <h1>Product: {params.productId}</h1>
      <h3>{item.name}</h3>
      <h3>{currencyFormat(item.price)}</h3>
      <button onClick={()=>addToCart(item)}>Add to cart</button>
    </div>
  )
}

export default Product;
