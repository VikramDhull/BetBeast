import React, { useContext } from "react";
import about from "../assets/about.jpg";
import { FaLocationArrow } from "react-icons/fa";
import { motion } from "motion/react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { setShowLogin, user, goToProtectedPage } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      id="about"
      className="bg-cover bg-no-repeat bg-center h-screen w-screen"
      style={{ backgroundImage: `url(${about})` }}
    >
      <motion.div
        className="flex flex-col justify-between items-center h-full py-4 sm:py-28 px-2 sm:px-28"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="orbitron text-white font-bold text-3xl sm:text-4xl">
          Redefining roulette with precision and elegance.
        </h1>
        <p className="play text-white text-[16px] sm:text-2xl text-start mt-2 sm:mt-10">
          For over a decade, I’ve lived and breathed roulette — not as a game of
          luck, but as a challenge of logic, numbers, and precision. With a
          strong background in mathematics,
          <br />I developed my own advanced betting strategies that have
          consistently delivered results and profits at the table. These
          strategies are unique, original, and not found anywhere else on the
          internet. Each one is designed to maximize your chances of winning by
          combining probability, statistics, and smart bankroll management.
          After years of personal success, I decided to build this platform to
          share my methods with players around the world.
          <br />
          Here, you can choose from a variety of strategies — from simple plays
          like color or even–odd, to advanced bets on quadrants and numbers. Our
          system automatically tracks every spin, calculates your next move, and
          tells you exactly where to bet and how much — all based on your budget
          and performance.
          <br />
          This website isn’t just about betting; it’s about recovering losses,
          playing smarter, and creating consistent profit opportunities. If
          you’ve ever felt that roulette is purely luck, it’s time to experience
          the difference of math-driven strategy.
        </p>
        <button
          onClick={() => {
            if (!user) {
              setShowLogin(true);
            } else {
              navigate("/strategy");
            }
          }}
          className="flex orbitron font-bold mt-2 sm:mt-18 text-xl bg-red-600 text-white px-8 py-3 rounded-md cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-102"
        >
          Try a Spin <FaLocationArrow className="ml-4 mt-1" />
        </button>
      </motion.div>
    </div>
  );
};

export default About;
