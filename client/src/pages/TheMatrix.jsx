import React, { useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { useState } from "react";
import { FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import { RiArrowGoBackFill, RiHome2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const TheMatrix = () => {
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
  const { user, setShowTheMatrixQ, backendUrl } = useContext(AppContext);
  const scrollRef = useRef(null);
  const submitCount = useRef(0);
  const [inputDisable, setInputDisable] = useState(false);
  const [initialBet, setInitialBet] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [noOfWin, setNoOfWin] = useState(0);
  const [profit, setProfit] = useState(0);
  const [winHistory, setWinHistory] = useState([]);
  const [displayName2, setDisplayName2] = useState({
    color: "",
    type: "",
    size: "",
  });
  const [displayQuadrant1, setDisplayQuadrant1] = useState("");
  const [displayQuadrant2, setDisplayQuadrant2] = useState("");
  const [displayColumn1, setDisplayColumn1] = useState("");
  const [displayColumn2, setDisplayColumn2] = useState("");
  const [displayCalculation2, setDisplayCalculation2] = useState(0);
  const [displayCalculation3, setDisplayCalculation3] = useState(0);
  const [previousCalculation, setPreviousCalculation] = useState([]);
  const [cycleResults2, setCycleResults2] = useState([]);
  const [cycleResults3, setCycleResults3] = useState([]);
  const navigate = useNavigate();

  const leavePayloadRef = useRef({
    userId: user._id,
    noOfWinD: noOfWin,
    profit,
  });
  leavePayloadRef.current = { userId: user._id, noOfWinD: noOfWin, profit };

  useEffect(() => {
    const url = backendUrl + "/api/user/saveToUserDatabase";
    let hasSent = false;

    const sendNow = () => {
      if (hasSent) return;
      hasSent = true;
      const data = leavePayloadRef.current;
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      navigator.sendBeacon?.(url, blob);
    };

    const onPageHide = () => {
      sendNow();
    };

    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      // On route change (component unmount) send async with axios
      const data = leavePayloadRef.current;
      axios.post(url, data).catch(() => {});
    };
  }, [backendUrl]);

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
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [winHistory]);

  // FORM SUBMIT
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (submitCount.current === 0) {
      if (!isValidNumber(initialBet)) {
        toast.error("Enter a valid whole number for initial bet");
        return;
      }
      setStartingAmount(parseInt(initialBet));
      setInitialBet(`Started with amount  ₹${initialBet}`);
      submitCount.current++;
      setInputDisable(true);
      return;
    }

    if (
      !isValidNumber(previousNumber) ||
      parseInt(previousNumber) < 0 ||
      parseInt(previousNumber) > 36
    ) {
      toast.error("Enter a valid previous number (0-36).");
      return;
    }

    const num = parseInt(previousNumber);
    setHistory((prev) => [...prev, num]);
    setPreviousNumber("");
  };

  // DISPLAY
  useEffect(() => {
    if (history.length > 0) {
      let num = history[history.length - 1];
      if (num === 0) {
        setDisplayName2({ color: "SAME", type: "SAME", size: "SAME" });
        setDisplayQuadrant1("S");
        setDisplayQuadrant2("A");
        setDisplayColumn1("M");
        setDisplayColumn2("E");
      } else {
        setDisplayName2({
          color: red.includes(num) ? "RED" : "BLACK",
          type: even.includes(num) ? "EVEN" : "ODD",
          size: small.includes(num) ? "SMALL" : "BIG",
        });

        let q1 = num;
        let c1 = num;
        let q2 = null;
        let c2 = null;
        for (let i = history.length - 2; i >= 0; i--) {
          if (history[i] === 0) continue;
          if (getQuadrant(history[i]) !== getQuadrant(q1)) {
            q2 = history[i];
            break;
          }
        }
        for (let i = history.length - 2; i >= 0; i--) {
          if (history[i] === 0) continue;
          if (getColumn(history[i]) !== getColumn(c1)) {
            c2 = history[i];
            break;
          }
        }
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

        // if (
        //   !isNaN(displayCalculation2) &&
        //   !isNaN(displayCalculation3) &&
        //   previousCalculation !== 0
        // ) {
        //   // console.log("previousCalculation : " + previousCalculation);
        //   // console.log(displayCalculation2 + displayCalculation3);
        //   if (
        //     previousCalculation >=
        //     displayCalculation2 + displayCalculation3
        //   ) {
        //     setNoOfWin((prev) => prev + 1);
        //     setProfit(
        //       (prev) => prev + (displayCalculation2 + displayCalculation3 * 1.5)
        //     );
        //     setWinHistory((prev) => [...prev, "WIN"]);
        //   } else {
        //     // setNoOfWin((prev) => prev + 0);
        //     setProfit(
        //       (prev) => prev - (displayCalculation2 + displayCalculation3)
        //     );
        //     setWinHistory((prev) => [...prev, "LOSE"]);
        //   }
        // }
      }
    }
  }, [history]);

  useEffect(() => {
    if (history.length < 2) {
      setDisplayCalculation2("skip");
      setDisplayCalculation3("skip");
      return;
    }
    if (submitCount.current == 1) {
      setDisplayCalculation2(startingAmount);
      setDisplayCalculation3(startingAmount);
      setPreviousCalculation((prev) => [...prev, startingAmount]);
      submitCount.current++;
      return;
    }

    let colorVal = displayCalculation2;
    let typeVal = displayCalculation2;
    let sizeVal = displayCalculation2;
    let last = history[history.length - 1];
    let secondLast = 0;
    let thirdLastForQuad = 0;
    let thirdLastForCol = 0;
    for (let i = history.length - 2; i >= 0; i--) {
      const current = history[i];
      if (!secondLast && current !== 0) {
        secondLast = current;
        continue;
      }
      if (
        secondLast &&
        !thirdLastForQuad &&
        getQuadrant(secondLast) !== getQuadrant(current)
      ) {
        thirdLastForQuad = current;
      }
      if (
        secondLast &&
        !thirdLastForCol &&
        getColumn(secondLast) !== getColumn(current)
      ) {
        thirdLastForCol = current;
      }
      if (secondLast && thirdLastForQuad && thirdLastForCol) break;
    }

    if (
      last !== 0 &&
      ((red.includes(last) && red.includes(secondLast)) ||
        (black.includes(last) && black.includes(secondLast)))
    ) {
      colValue = startingAmount;
      setNoOfWin((prev) => prev + 1);
    } else {
      colValue = colValue * 2;
    }

    if (
      last !== 0 &&
      ((even.includes(last) && even.includes(secondLast)) ||
        (odd.includes(last) && odd.includes(secondLast)))
    ) {
      typeVal = startingAmount;
      setNoOfWin((prev) => prev + 1);
    } else {
      typeVal = typeVal * 2;
    }

    if (
      last !== 0 &&
      ((small.includes(last) && small.includes(secondLast)) ||
        (big.includes(last) && big.includes(secondLast)))
    ) {
      sizeVal = startingAmount;
      setNoOfWin((prev) => prev + 1);
    } else {
      sizeVal = sizeVal * 2;
    }

    let result2 = (colorVal + typeVal + sizeVal) / 3;

    // QUAD & COL
    let quadValue = displayCalculation3;
    let colValue = displayCalculation3;

    if (
      last !== 0 &&
      (getQuadrant(last) === getQuadrant(secondLast) ||
        getQuadrant(last) === getQuadrant(thirdLastForQuad))
    ) {
      quadValue = startingAmount;
      setNoOfWin((prev) => prev + 1);
    } else {
      quadValue = quadValue * 3;
    }

    if (
      last !== 0 &&
      (getColumn(last) === getColumn(secondLast) ||
        getColumn(last) === getColumn(thirdLastForCol))
    ) {
      colValue = startingAmount;
      setNoOfWin((prev) => prev + 1);
    } else {
      colValue = colValue * 3;
    }

    let result3 = (quadValue + colValue) / 2;

    setPreviousCalculation((prev) => [...prev, result2 + result3]);
    let preLength = previousCalculation.length;
    if (preLength > 1) {
      if (
        previousCalculation[preLength - 1] > previousCalculation[preLength - 2]
      ) {
        setWinHistory((prev) => [...prev, "LOSE"]);
        setProfit(
          (prev) =>
            prev - Math.ceil(previousCalculation[preLength - 2] / 10) * 10
        );
      } else {
        setWinHistory((prev) => [...prev, "WIN"]);
        setProfit(
          (prev) =>
            prev + Math.ceil(previousCalculation[preLength - 2] / 10) * 10
        );
      }
    }

    // setPreviousCalculation(result2 + result3);
    // if (previousCalculation !== 0) {
    //   if (previousCalculation >= result2 + result3) {
    //     setNoOfWin((prev) => prev + 1);
    //     setProfit(
    //       (prev) => prev + (displayCalculation2 + displayCalculation3 * 1.5)
    //     );
    //   } else {
    //     setProfit((prev) => prev - (displayCalculation2 + displayCalculation3));
    //   }
    // }

    const updatedCycleResults2 = [...cycleResults2, result2];
    const updatedCycleResults3 = [...cycleResults3, result3];

    setCycleResults2(updatedCycleResults2);
    setCycleResults3(updatedCycleResults3);

    if (updatedCycleResults2.length < 3) {
      setDisplayCalculation2(displayCalculation2);
      setDisplayCalculation3(displayCalculation3);
    } else {
      let twoo =
        (updatedCycleResults2[0] +
          updatedCycleResults2[1] +
          updatedCycleResults2[2]) /
        3;
      let threee =
        (updatedCycleResults3[0] +
          updatedCycleResults3[1] +
          updatedCycleResults3[2]) /
        3;

      setCycleResults2([]);
      setCycleResults3([]);

      let roundTwo = Math.ceil(twoo / 10) * 10;
      let roundThree = Math.ceil(threee / 10) * 10;

      setDisplayCalculation2(roundTwo);
      setDisplayCalculation3(roundThree);
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center sm:p-8 p-2">
      <div className="flex justify-between items-center w-full max-w-4xl px-4">
        <div className="cursor-pointer  mb-2">
          <img src={logo} alt="Logo" className="sm:w-50 w-40 mx-auto" />
        </div>
        <div className="flex justify-center items-center gap-4 cursor-pointer hover:scale-103 hover:text-red-600">
          <h2
            onClick={() => {
              if (!user) {
                setShowLogin(true);
              } else {
                navigate("/profile");
              }
            }}
            className="play sm:text-3xl text-xl font-bold text-center"
          >
            {user.name}
          </h2>
          <FaUserCircle className="text-3xl" />
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl sm:p-8 p-6">
        <div className="flex justify-between items-center sm:mx-2 mx-1 mb-8">
          <RiArrowGoBackFill
            onClick={() => {
              if (!user) {
                setShowLogin(true);
              } else {
                navigate("/strategy");
              }
            }}
            className="text-3xl cursor-pointer hover:scale-105 hover:text-red-600"
          />
          <h2 className="orbitron sm:text-3xl text-xl font-bold text-center">
            The Matrix
          </h2>
          <RiHome2Line
            onClick={() => navigate("/")}
            className="text-3xl cursor-pointer hover:scale-105 hover:text-red-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-10 w-full max-w-4xl">
          <div className="bg-gray-700 rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Total Wins</h3>
            <p className="text-2xl font-bold text-yellow-400">{noOfWin}</p>
          </div>
          <div className="bg-gray-700 rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Total Profit</h3>
            <p
              className={`text-2xl font-bold ${
                profit < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              ₹ {profit}
            </p>
          </div>
        </div>

        {/* History Line */}
        <div className="bg-gray-700 p-5 rounded-xl mb-6 sm:mb-10">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap"
          >
            {winHistory.map((result, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-md font-bold ${
                  result === "WIN"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {result}
              </span>
            ))}
          </div>
        </div>

        {/* Strategy Display */}
        <div className="relative flex justify-between px-8 sm:px-40 mb-6 sm:mb-10 bg-gray-700 w-full p-6 rounded-xl shadow-lg">
          <div className="ml-5">
            <h2 className="play text-xl sm:text-3xl font-bold text-white">
              {displayName2.color} / {displayName2.type} / {displayName2.size} :
              ₹{displayCalculation2}
            </h2>
            <h2 className="play text-xl sm:text-3xl font-bold text-white">
              QUAD : {displayQuadrant1},{displayQuadrant2} / COL :{" "}
              {displayColumn1},{displayColumn2} : ₹{displayCalculation3}
            </h2>
          </div>

          {/* <h2 className="text-2xl mt-3">₹{displayCalculation}</h2> */}
          <FaQuestionCircle
            onClick={() => setShowTheMatrixQ(true)}
            className="absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-600 hover:scale-110"
          />
        </div>

        {/* Form */}
        <div className="bg-gray-700 w-full p-6 rounded-xl shadow-lg">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            {!inputDisable ? (
              <input
                onChange={(e) => setInitialBet(e.target.value)}
                type="text"
                placeholder="Enter initial bet amount"
                name="initialbet"
                value={initialBet}
                autoComplete="off"
                className="w-full px-4 py-2 rounded-md bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                onChange={(e) => setPreviousNumber(e.target.value)}
                type="text"
                placeholder="previous number"
                name="previousnumber"
                value={previousNumber}
                autoComplete="off"
                className="w-full px-4 py-2 rounded-md bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <button
              type="submit"
              className="bg-blue-600 py-2 rounded-md text-lg font-bold hover:bg-blue-700 transition-all"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TheMatrix;
