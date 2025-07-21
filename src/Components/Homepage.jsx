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
  let quadrant1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let quadrant2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  let quadrant3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  let column1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
  let column2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
  let column3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

  const submitCount = useRef(0);
  const [dummy, setDummy] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [initialBet, setInitialBet] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [submittedPreviousNumber, setSubmittedPreviousNumber] = useState("");
  const [secondPreviousNumber, setSecondPreviousNumber] = useState("");
  // const [diffrentPreviousNumber, setdiffrentPreviousNumber] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [displayName2, setDisplayName2] = useState({
    color: "",
    type: "",
    size: "",
  });
  const [displayQuadrant1, setDisplayQuadrant1] = useState("");
  const [displayQuadrant2, setDisplayQuadrant2] = useState("");
  const [displayColumn1, setDisplayColumn1] = useState("");
  const [displayColumn2, setDisplayColumn2] = useState("");
  const [displayCalculation2, setDisplayCalculation2] = useState("");
  const [displayCalculation3, setDisplayCalculation3] = useState("");

  const isValidNumber = (val) => {
    return /^\d+$/.test(val); // only digits, no decimal, no negatives
  };

  function getQuadrant(n) {
    if (quadrant1.includes(n)) return "1";
    if (quadrant2.includes(n)) return "2";
    if (quadrant3.includes(n)) return "3";
    return null;
  }
  function getColumn(n) {
    if (column1.includes(n)) return "1";
    if (column2.includes(n)) return "2";
    if (column3.includes(n)) return "3";
    return null;
  }

  useEffect(() => {
    if (submittedPreviousNumber !== "") {
      handleDisplayName2(submittedPreviousNumber);
    }
  }, [submittedPreviousNumber]);

  // useEffect(() => {
  //   if (submittedPreviousNumber !== "") {
  //     handleDisplayName3(
  //       submittedPreviousNumber,
  //       secondPreviousNumber,
  //       diffrentPreviousNumber
  //     );
  //   }
  // }, [submittedPreviousNumber, secondPreviousNumber, diffrentPreviousNumber]);

  useEffect(() => {
    if (startingAmount !== "" && submittedPreviousNumber !== "") {
      handleDisplayCalculation();
    }
  }, [startingAmount, submittedPreviousNumber, dummy]);

  // ON SUBMIT
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
    // setPreviousNumber("");

    // const currentNum = parseInt(previousNumber);
    // setdiffrentPreviousNumber(
    //   submittedPreviousNumber !== secondPreviousNumber
    //     ? secondPreviousNumber
    //     : diffrentPreviousNumber // or blank if desired
    // );
    // setSecondPreviousNumber(submittedPreviousNumber);
    // setSubmittedPreviousNumber(currentNum);
    // setPreviousNumber("");
    const num = parseInt(previousNumber);
    if (num >= 0 && num <= 36) {
      setHistory((prev) => [...prev, num]);
      setPreviousNumber("");
    }
  };

  const handleDisplayName2 = (num) => {
    num = parseInt(num);
    if (num === 0) {
      setDisplayName2({ color: "SAME", type: "SAME", size: "SAME" });
    } else {
      setDisplayName2({
        color: red.includes(num) ? "RED" : "BLACK",
        type: even.includes(num) ? "EVEN" : "ODD",
        size: small.includes(num) ? "SMALL" : "BIG",
      });
    }
  };
  // const handleDisplayName3 = (
  //   submittedPreviousNumber,
  //   secondPreviousNumber,
  //   diffrentPreviousNumber
  // ) => {
  //   console.log(`submittedPreviousNumber : ${submittedPreviousNumber}`);
  //   console.log(`secondPreviousNumber : ${secondPreviousNumber}`);
  //   console.log(`diffrentPreviousNumber : ${diffrentPreviousNumber}`);
  // };

  // console.log(`starting amount : ${startingAmount}`);
  // console.log(`previous number : ${submittedPreviousNumber}`);
  // console.log(`second previus number ${secondPreviousNumber}`);

  useEffect(() => {
    if (history.length > 0) {
      let q1 = history[history.length - 1];
      let c1 = q1;
      let q2 = null;
      let c2 = null;
      for (let i = history.length - 2; i >= 0; i--) {
        if (getQuadrant(history[i]) !== getQuadrant(q1)) {
          q2 = history[i];
          break;
        }
      }
      for (let i = history.length - 2; i >= 0; i--) {
        if (getColumn(history[i]) !== getColumn(c1)) {
          c2 = history[i];
          break;
        }
      }
      // console.log(`quadrants : ${getQuadrant(q1)},${getQuadrant(q2)}`);
      // console.log(`columns : ${getColumn(c1)},${getColumn(c2)}`);

      const gq1 = getQuadrant(q1);
      const gq2 = getQuadrant(q2);
      gq1 < gq2
        ? (setDisplayQuadrant1(gq1), setDisplayQuadrant2(gq2))
        : (setDisplayQuadrant1(gq2), setDisplayQuadrant2(gq1));

      const gc1 = getColumn(c1);
      const gc2 = getColumn(c2);
      gc1 < gc2
        ? (setDisplayColumn1(gc1), setDisplayColumn2(gc2))
        : (setDisplayColumn1(gc2), setDisplayColumn2(gc1));
    }
  }, [history]);

  const handleDisplayCalculation = () => {
    if (history.length < 2) {
      setDisplayCalculation2("skip");
      setDisplayCalculation3("skip");
      return;
    }
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

    // QUADRANT & LINE
    let quadValue = displayCalculation3 / 2;
    let colValue = displayCalculation3 / 2;
  };

  return (
    <div className="homepage">
      <div className="logo">
        <img src={logo} alt="Logo"></img>
      </div>
      <div className="homepage-main">
        <div className="display">
          <h2>
            {displayName2.color} / {displayName2.type} / {displayName2.size} : ₹
            {displayCalculation2}
          </h2>
          <h2>
            QUAD : {displayQuadrant1},{displayQuadrant2} / COL :{" "}
            {displayColumn1},{displayColumn2} : ₹{displayCalculation3}
          </h2>
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

// let n1 = parseInt(previousNumber);
// let n2 = secondPreviousNumber;
// let n3 = diffrentPreviousNumber;
// let displayQ, displayC;

// if (n1 === n2) {
//   displayQ = [getQuadrant(n1), getQuadrant(n3)];
//   displayC = [getColumn(n1), getColumn(n3)];
// } else {
//   displayQ = [getQuadrant(n1), getQuadrant(n2)];
//   displayC = [getColumn(n1), getColumn(n2)];
// }
// setDisplayQuadrants(displayQ);
// setDisplayColumns(displayC);
