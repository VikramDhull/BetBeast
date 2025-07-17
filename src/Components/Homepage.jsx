import "./Homepage.css";
import logo from "../assets/logo.png";
import { useState } from "react";

const Homepage = () => {
  let red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  let black = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
  ];
  let even = [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
  ];
  let odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
  let small = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  let big = [
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ];
  let quadrant1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let quadrant2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  let quadrant3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  let line1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
  let line2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
  let line3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

  const [buttonDisable, setButtonDisable] = useState(false);
  const [initialBet, setInitialBet] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [displayName, setDisplayName] = useState({
    color: "",
    type: "",
    size: "",
    quadrant: "",
    line: "",
  });

  let onSubmit = (event) => {
    if (
      !isNaN(initialBet) &&
      initialBet !== "" &&
      !isNaN(previousNumber) &&
      previousNumber !== ""
    ) {
      event.preventDefault();
      let startingAmount = initialBet;
      setInitialBet(`Started with amount  ₹${initialBet}`);
      setPreviousNumber("");
      setButtonDisable(true);
    } else {
      event.preventDefault();
      alert("enter valid number");
    }
  };

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
          <form onSubmit={onSubmit}>
            <input
              onChange={(e) => setInitialBet(e.target.value)}
              disabled={buttonDisable}
              type="text"
              placeholder="initial bet amount"
              name="initialbet"
              value={initialBet}
            ></input>
            <input
              onChange={(e) => setPreviousNumber(e.target.value)}
              type="text"
              placeholder="previous number"
              name="previousnumber"
              value={previousNumber}
            ></input>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
