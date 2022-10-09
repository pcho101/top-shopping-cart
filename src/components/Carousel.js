import { useNavigate } from "react-router-dom";

const Carousel = (props) => {
  const { radioIndex, games, toggleActive, isActive } = props;
  const navigate = useNavigate();

  return (
    <div className="container">
      <input type="radio" name="slider" id="item-1" checked={radioIndex === 0} readOnly/>
      <input type="radio" name="slider" id="item-2" checked={radioIndex === 1} readOnly/>
      <input type="radio" name="slider" id="item-3" checked={radioIndex === 2} readOnly/>
      {games.length > 0 && 
        <div className="cards">
          <label className="card" htmlFor="item-1" id="game-1">
            <img src={games[0].image} onClick={() => navigate(`/product/${games[0].id}`)} alt="game-1"></img>
          </label>
          <label className="card" htmlFor="item-2" id="game-2">
            <img src={games[1].image} onClick={() => navigate(`/product/${games[1].id}`)} alt="game-2"></img>
          </label>
          <label className="card" htmlFor="item-3" id="game-3">
            <img src={games[2].image} onClick={() => navigate(`/product/${games[2].id}`)} alt="game-3"></img>
          </label>
        </div>
      }
      <button className="btn-animate" onClick={() => toggleActive()}>
        {isActive ? "PAUSE" : "PLAY"}
      </button>
    </div>
  )
}

export default Carousel;
