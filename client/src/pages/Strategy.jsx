import React from "react";
import Navbar from "../components/Navbar";
import roulette from "../assets/image.png";
import { motion } from "motion/react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Strategy = () => {
  const { setShowLogin, user, backendUrl, setCredit, token } =
    useContext(AppContext);
  const navigate = useNavigate();

  const goToSafeSquares = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/goToSafeSquares",
        { email: user.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        navigate("/safesquares");
        setCredit(data.creditBalance);
      } else {
        navigate("/pricing");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const goToTheNet = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/goToTheNet",
        { email: user.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        navigate("/thenet");
      } else {
        navigate("/pricing");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const goToTheMatrix = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/goToTheMatrix",
        { email: user.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        navigate("/thematrix");
      } else {
        navigate("/pricing");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen w-screen"
      style={{ backgroundImage: `url(${roulette})` }}
    >
      <Navbar />
      <motion.div
        className="flex flex-col justify-center items-center  py-10"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="orbitron text-3xl sm:text-4xl font-bold text-white mb-10">
          Choose Your Strategy
        </h2>

        <div className="grid gap-4 sm:grid-cols-3 w-[400px] sm:w-[1100px] mx-auto px-6">
          <div className="bg-gray-900 shadow-lg rounded-2xl p-8 text-white border-2 border-yellow-400 hover:shadow-2xl transition relative hover:scale-102">
            <h3 className="orbitron text-3xl font-semibold">Safe Squares</h3>
            <p className="text-gray-300 mt-2">Easy bets placing</p>
            <p className="text-4xl font-bold mt-6">
              10 credits{" "}
              <span className="text-lg text-gray-400">/ per session</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-200">
              <li>✔ Easy bets</li>
              <li>✔ Good for beginners</li>
              <li>✔ Smart bet guidance</li>
              <li>✔ Win/Loss tracking</li>
              <li>✔ Personalized bet calculations</li>
              <li>✔ Recommend balance : 30k</li>
            </ul>
            <button
              onClick={goToSafeSquares}
              className="orbitron cursor-pointer mt-8 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 active:scale-98 transition"
            >
              PLAY
            </button>
          </div>

          <div className="bg-gray-900 shadow-lg rounded-2xl p-8 text-white border-2 border-yellow-400 hover:shadow-2xl transition relative hover:scale-102">
            <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              recommend
            </span>
            <h3 className="orbitron text-3xl font-semibold">The Net</h3>
            <p className="text-gray-300 mt-2">The Wager Master</p>
            <p className="text-4xl font-bold mt-6">
              20 credits{" "}
              <span className="text-lg text-gray-400">/per session</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-200">
              <li>✔ Very easy bets</li>
              <li>✔ Even newbie can play</li>
              <li>✔ Smart bet guidance</li>
              <li>✔ Win/Loss tracking</li>
              <li>✔ Personalized bet calculations</li>
              <li>✔ Recommend balance : 100k</li>
            </ul>
            <button
              onClick={goToTheNet}
              className="orbitron cursor-pointer mt-8 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 active:scale-98 transition"
            >
              PLAY
            </button>
          </div>

          <div className="bg-gray-900 shadow-lg rounded-2xl p-8 text-white border-2 border-yellow-400 hover:shadow-2xl transition relative hover:scale-102">
            <h3 className="orbitron text-3xl font-semibold">The Matrix</h3>
            <p className="text-gray-300 mt-2">Need speed for placing bets</p>
            <p className="text-4xl font-bold mt-6">
              10 credits{" "}
              <span className="text-lg text-gray-400">/ per session</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-200">
              <li>✔ Complex bets</li>
              <li>✔ Not for beginners</li>
              <li>✔ Smart bet guidance</li>
              <li>✔ Win/Loss tracking</li>
              <li>✔ Personalized bet calculations</li>
              <li>✔ Recommend balance : 50k</li>
            </ul>
            <button
              onClick={goToTheMatrix}
              className="orbitron cursor-pointer mt-8 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 active:scale-98 transition"
            >
              PLAY
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Strategy;
