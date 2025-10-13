import React, { useContext } from "react";
import howImage from "../assets/how.jpg";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AppContext } from "../Context/AppContext";

const How = () => {
  const navigate = useNavigate();
  const { setShowLogin, user, goToProtectedPage } = useContext(AppContext);

  return (
    <div
      id="howitworks"
      className="bg-cover bg-no-repeat bg-center h-screen w-screen"
      style={{ backgroundImage: `url(${howImage})` }}
    >
      <motion.div
        className="flex flex-col justify-between h-full py-28 px-12 sm:px-28"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="play text-white font-bold text-3xl sm:text-4xl max-w-[700px]">
          but the real question is
          <br />
          <span className="text-red-500 orbitron text-5xl sm:text-6xl">
            HOW ?
          </span>
        </h1>

        <p className="play text-white text-xl sm:text-2xl text-start max-w-xl mt-10">
          Pick your favorite strategy — whether from colors and odds to
          quadrants or columns or direct numbers.
          <br />
          <br />
          Define your budget, and our intelligent system tracks every win and
          loss automatically, then tells you exactly{" "}
          <span className="text-red-500">where to bet</span> and{" "}
          <span className="text-red-500">how much</span> on the next spin.
          <br />
          <br />
          Simple, smart, and designed to keep you ahead of the game.
        </p>

        <button
          onClick={() => {
            if (!user) {
              setShowLogin(true);
            } else {
              navigate("/strategy");
            }
          }}
          className="orbitron w-80 font-bold text-xl bg-red-600 text-white px-8 py-3 rounded-md cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-102 mt-10 flex items-center justify-center gap-4"
        >
          explore strategies <FaRegArrowAltCircleRight className="text-2xl" />
        </button>
      </motion.div>
    </div>
  );
};

export default How;
