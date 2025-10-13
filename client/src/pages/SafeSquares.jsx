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

const SafeSquares = () => {
  const { user, setShowSafeSquareQ, backendUrl } = useContext(AppContext);
  const scrollRef = useRef(null);
  const submitCount = useRef(0);
  const [inputDisable, setInputDisable] = useState(false);
  const [startingAmount, setStartingAmount] = useState("");
  const [initialBet, setInitialBet] = useState("");
  const [noOfWin, setNoOfWin] = useState("");
  const [noOfWinD, setNoOfWinD] = useState(0);
  const [profit, setProfit] = useState(0);
  const [history, setHistory] = useState([]);
  const [winHistory, setWinHistory] = useState([]);
  const [displayCalculation, setDisplayCalculation] = useState("");
  const [cycleResults, setCycleResults] = useState([]);
  const navigate = useNavigate();

  const leavePayloadRef = useRef({ userId: user._id, noOfWinD, profit });
  leavePayloadRef.current = { userId: user._id, noOfWinD, profit };

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [winHistory]);

  const isValidNumber = (val) => {
    return /^\d+$/.test(val); // only digits, no decimal, no negatives
  };

  // FORM SUBMIT
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (submitCount.current === 0) {
      if (!isValidNumber(initialBet) || initialBet % 10 != 0) {
        toast.error(
          "Enter a valid whole number for initial bet (multiple of 10)"
        );
        return;
      }
      const starting = parseInt(initialBet);
      setStartingAmount(starting);
      setDisplayCalculation(starting);
      submitCount.current++;
      setInputDisable(true);
      return;
    }

    if (submitCount.current > 0) {
      if (
        !isValidNumber(noOfWin) ||
        parseInt(noOfWin) < 0 ||
        parseInt(noOfWin) > 2
      ) {
        toast.error("Enter valid no of winnings (0-2).");
        return;
      }
      const num = parseInt(noOfWin);
      setHistory((prev) => [...prev, num]);
      setNoOfWin("");
    }
  };

  useEffect(() => {
    if (history.length === 0) return;

    const lastWin = history[history.length - 1];
    let result;
    if (lastWin == 0) {
      result = displayCalculation * 3;
      setProfit((prev) => prev - displayCalculation * 4);
      setWinHistory((prev) => [...prev, "LOSE"]);
    }
    if (lastWin == 1) {
      result = (startingAmount * 2 + displayCalculation * 6) / 4;
      setNoOfWinD((prev) => prev + 1);
      setProfit((prev) => prev - displayCalculation);
      setWinHistory((prev) => [...prev, "WIN"]);
    }
    if (lastWin == 2) {
      result = startingAmount;
      setNoOfWinD((prev) => prev + 2);
      setProfit((prev) => prev + displayCalculation * 2);
      setWinHistory((prev) => [...prev, "WIN"]);
    }

    const updatedCycleResults = [...cycleResults, result];
    setCycleResults(updatedCycleResults);

    if (updatedCycleResults.length < 3) {
      setDisplayCalculation(displayCalculation);
    } else {
      let avg =
        (updatedCycleResults[0] +
          updatedCycleResults[1] +
          updatedCycleResults[2]) /
        3;
      setCycleResults([]);

      let rounded = Math.ceil(avg / 10) * 10;
      setDisplayCalculation(rounded);
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
            Safe Squares
          </h2>
          <RiHome2Line
            onClick={() => navigate("/")}
            className="text-3xl cursor-pointer hover:scale-105 hover:text-red-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-10 w-full max-w-4xl">
          <div className="bg-gray-700 rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Total Wins</h3>
            <p className="text-2xl font-bold text-yellow-400">{noOfWinD}</p>
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
        <div className="relative flex justify-evenly px-8 sm:px-40 mb-6 sm:mb-10 bg-gray-700 w-full p-6 rounded-xl shadow-lg">
          <h2 className="play text-xl sm:text-3xl font-bold text-white">
            Bet on 2 Quads and 2 Cols :
          </h2>
          <h2 className="play text-xl sm:text-3xl font-bold text-white">
            ₹{displayCalculation}
          </h2>
          {/* <h2 className="text-2xl mt-3">₹{displayCalculation}</h2> */}
          <FaQuestionCircle
            onClick={() => setShowSafeSquareQ(true)}
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
                onChange={(e) => setNoOfWin(e.target.value)}
                type="text"
                placeholder="Number of last bets won"
                name="previousnumber"
                value={noOfWin}
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

export default SafeSquares;
