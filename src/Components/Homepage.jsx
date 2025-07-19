import "./Homepage.css";
import logo from "../assets/logo.png";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = () => {
  let red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  let even = [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
  ];
  let small = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const submitCount = useRef(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [initialBet, setInitialBet] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [submittedPreviousNumber, setSubmittedPreviousNumber] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [displayName, setDisplayName] = useState({
    color: "",
    type: "",
    size: "",
  });
  let temp;

  const isValidNumber = (val) => {
    return /^\d+$/.test(val); // only digits, no decimal, no negatives
  };

  useEffect(() => {
    if (submittedPreviousNumber !== "") {
      handleDisplayName(submittedPreviousNumber);
    }
  }, [submittedPreviousNumber]);

  useEffect(() => {
    if (startingAmount !== "" && submittedPreviousNumber !== "") {
      handleDisplayCalculation();
    }
  }, [startingAmount, submittedPreviousNumber]);

  let handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      !isValidNumber(previousNumber) ||
      parseInt(previousNumber) < 0 ||
      parseInt(previousNumber) > 36
    ) {
      toast.error("Enter a valid previous number (0-36).");
      return;
    }
    if (submitCount.current === 0) {
      if (!isValidNumber(initialBet)) {
        toast.error("Enter a valid whole number for initial bet");
        return;
      } else {
        setStartingAmount(parseInt(initialBet));
        setInitialBet(`Started with amount  ₹${initialBet}`);
        submitCount.current++;
        setButtonDisable(true);
      }
    }
    setSubmittedPreviousNumber(parseInt(previousNumber));

    setPreviousNumber("");
  };

  const handleDisplayName = (num) => {
    num = parseInt(num);
    if (num === 0) {
      setDisplayName({ color: "SAME", type: "SAME", size: "SAME" });
    } else {
      setDisplayName({
        color: red.includes(num) ? "RED" : "BLACK",
        type: even.includes(num) ? "EVEN" : "ODD",
        size: small.includes(num) ? "SMALL" : "BIG",
      });
    }
  };

  const handleDisplayCalculation = () => {
    console.log(`starting amount : ${startingAmount}`);
    console.log(`previous number : ${submittedPreviousNumber}`);
  };

  return (
    <div className="homepage">
      <div className="logo">
        <img src={logo} alt="Logo"></img>
      </div>
      <div className="homepage-main">
        <div className="display">
          <h2>
            {displayName.color} / {displayName.type} / {displayName.size} : ₹11
          </h2>
          <h2>2 QUADRANT / 2 LINE : ₹11</h2>
        </div>
        <div className="form">
          <form onSubmit={handleFormSubmit}>
            <input
              onChange={(e) => setInitialBet(e.target.value)}
              disabled={buttonDisable}
              type="text"
              placeholder="initial bet amount"
              name="initialbet"
              value={initialBet}
              autoComplete="off"
            ></input>
            <input
              onChange={(e) => setPreviousNumber(e.target.value)}
              type="text"
              placeholder="previous number"
              name="previousnumber"
              value={previousNumber}
              autoComplete="off"
            ></input>
            <button type="submit">SUBMIT</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
