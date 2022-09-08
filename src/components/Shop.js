const Shop = (props) => {
  const { addToCart } = props;
  const sampleData = [
    {
      name: 'item1',
      id: 0,
      price: 20.00,
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
      price: 7.00,
    }
  ]
  const itemStyle = {
    height: "25vh",
    width: "20vh",
    border: "1px solid grey",
    backgroundColor: "lightblue"
  }
  return (
    <div>
      <h1>Shop Page</h1>
      {sampleData.map((item) => (
        <div key={item.id} style={itemStyle}>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <button onClick={()=>addToCart(item)}>Add to cart</button>
        </div>
      ))}
    </div>
  )
}

export default Shop;
