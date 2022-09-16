import { useNavigate, useSearchParams } from "react-router-dom";

const Shop = (props) => {
  const { addToCart, currencyFormat, games } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
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
  const itemStyle = {
    height: "25vh",
    width: "20vh",
    border: "1px solid grey",
    backgroundColor: "lightblue"
  }
  const itemStyle2 = {
    height: "min-content",
    width: "min-content",
    border: "1px solid grey",
    backgroundColor: "lightblue"
  }
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr)"
  }
  return (
    <div>
      <h1>Shop Page</h1>
      <input
        value={searchParams.get("filter") || ""}
        onChange={(event) => {
          let filter = event.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
      />
      <div style={gridStyle}>
        { games
        ? games
          .filter((item) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = item.name.toLocaleLowerCase();
            return name.includes(filter.toLocaleLowerCase());
          })
          .map((item, index) => (
          <div key={index} style={itemStyle2} onClick={() => navigate(`/product/${item.id}`)}>
            <h3>{item.name}</h3>
            <img src={item.thumb}/>
          </div>
        ))
        : null }
      </div>
      {sampleData
      .filter((item) => {
        let filter = searchParams.get("filter");
        if (!filter) return true;
        let name = item.name.toLocaleLowerCase();
        return name.includes(filter.toLocaleLowerCase());
      })
      .map((item) => (
        <div key={item.id} style={itemStyle} onClick={() => navigate(`/product/${item.id}`)}>
          <div>{item.name}</div>
          <div>{currencyFormat(item.price)}</div>
          <button onClick={()=>addToCart(item)}>Add to cart</button>
        </div>
      ))}
    </div>
  )
}

export default Shop;
