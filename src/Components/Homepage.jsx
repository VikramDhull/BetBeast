import "./Homepage.css";
import logo from "../assets/logo.png";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="homepage-main">
        <div className="display">
          <h2>RED / EVEN / SMALL : 100</h2>
          <h2>QUADRANT / LINE : 100</h2>
        </div>
        <div className="form">
          <form>
            <input type="text" placeholder="initial bet amount"></input>
            <input type="text" placeholder="previous number"></input>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
