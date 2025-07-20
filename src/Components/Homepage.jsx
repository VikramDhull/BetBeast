import "./Homepage.css";
import logo from "../assets/logo.png";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const submitCount = useRef(0);
  const [dummy, setDummy] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [initialBet, setInitialBet] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [submittedPreviousNumber, setSubmittedPreviousNumber] = useState("");
  const [secondPreviousNumber, setSecondPreviousNumber] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [displayName, setDisplayName] = useState({
    color: "",
    type: "",
    size: "",
  });
  const [displayCalculation2, setDisplayCalculation2] = useState("");
  const [displayCalculation3, setDisplayCalculation3] = useState("");

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
  }, [startingAmount, submittedPreviousNumber, dummy]);

  let handleFormSubmit = (event) => {
    event.preventDefault();
    setDummy((d) => d + 1);
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
    setSecondPreviousNumber(parseInt(submittedPreviousNumber));
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

  // console.log(`starting amount : ${startingAmount}`);
  // console.log(`previous number : ${submittedPreviousNumber}`);
  // console.log(`second previus number ${secondPreviousNumber}`);
  const handleDisplayCalculation = () => {
    if (submitCount.current == 1) {
      setDisplayCalculation2(startingAmount);
      setDisplayCalculation3(startingAmount);
      submitCount.current++;
      return;
    }
    if (submittedPreviousNumber == 0) {
      setDisplayCalculation2((prev) => prev * 2);
      setDisplayCalculation3((prev) => prev * 3);
      return;
    }
    let colorVal = displayCalculation2;
    let typeVal = displayCalculation2;
    let sizeVal = displayCalculation2;
    colorVal =
      (red.includes(submittedPreviousNumber) &&
        red.includes(secondPreviousNumber)) ||
      (black.includes(submittedPreviousNumber) &&
        black.includes(secondPreviousNumber))
        ? startingAmount
        : colorVal * 2;

    typeVal =
      (even.includes(submittedPreviousNumber) &&
        even.includes(secondPreviousNumber)) ||
      (odd.includes(submittedPreviousNumber) &&
        odd.includes(secondPreviousNumber))
        ? startingAmount
        : typeVal * 2;

    sizeVal =
      (small.includes(submittedPreviousNumber) &&
        small.includes(secondPreviousNumber)) ||
      (big.includes(submittedPreviousNumber) &&
        big.includes(secondPreviousNumber))
        ? startingAmount
        : sizeVal * 2;

    let result2 = Math.ceil((colorVal + typeVal + sizeVal) / 3 / 10) * 10;
    setDisplayCalculation2(result2);
  };

  return (
    <div className="homepage">
      <div className="logo">
        <img src={logo} alt="Logo"></img>
      </div>
      <div className="homepage-main">
        <div className="display">
          <h2>
            {displayName.color} / {displayName.type} / {displayName.size} : ₹
            {displayCalculation2}
          </h2>
          <h2>2 QUADRANT / 2 LINE : ₹{displayCalculation3}</h2>
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
