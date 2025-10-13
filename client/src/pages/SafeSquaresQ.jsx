import React from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import safesquares from "../assets/safesquares.jpg";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";

const SafeSquaresQ = () => {
  const { setShowSafeSquareQ } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <div className="flex flex-col gap-8 relative bg-gray-900 p-4 sm:p-10 mx-4 rounded-xl border-1 border-yellow-400">
        <MdClose
          onClick={() => setShowSafeSquareQ(false)}
          className="text-3xl text-white absolute top-3 right-3 cursor-pointer hover:text-red-600 hover:scale-105"
        />
        <h1 className=" play text-center text-xl sm:text-2xl text-white font-medium">
          Bet on 2 Quads and 2 Cols : 500
        </h1>
        <img src={safesquares} width={600} />
        <h2 className=" play text-center text-xl sm:text-2xl text-white font-medium">
          Always pick both quadrants and columns <br /> which are high in last
          50-100 rounds <br /> - check Statistics
        </h2>
      </div>
    </div>
  );
};

export default SafeSquaresQ;
