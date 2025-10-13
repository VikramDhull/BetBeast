import React, { useContext } from "react";
import roulette from "../assets/image.png";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin, goToProtectedPage } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen w-screen"
      style={{ backgroundImage: `url(${roulette})` }}
    >
      <Navbar />
      <motion.div
        className="flex flex-col justify-center items-center text-center my-6"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="orbitron  text-white font-bold text-5xl max-w-[500px] sm:text-7xl sm:max-w-[700px] mx-auto mt-8 sm:mt-14 text-center">
          Beat the <span className="text-red-500 orbitron">Wheel</span>, with
          Style!
        </h1>
        <p className="play text-white text-2xl sm:text-3xl text-center max-w-4xl mx-auto mt-12 ml-9 mr-9">
          Roulette isn’t just luck — it’s strategy with a twist.
          <br />
          Pick your play, follow our smart betting guide, and watch the odds
          turn in your favor. It’s time to play bold, win big, and have fun
          while you do it!
        </p>

        <button
          onClick={() => {
            if (!user) {
              setShowLogin(true);
            } else {
              navigate("/strategy");
            }
          }}
          className="orbitron font-bold mt-18 text-xl bg-red-600 text-white px-8 py-3 rounded-md cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-102"
        >
          PLAY NOW!
        </button>
      </motion.div>
    </div>
  );
};

export default Header;
