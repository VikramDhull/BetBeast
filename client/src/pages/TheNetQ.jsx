import React, { useContext, useEffect } from "react";
import thenet from "../assets/thenet.jpg";
import { AppContext } from "../Context/AppContext";
import { MdClose } from "react-icons/md";

const TheNetQ = () => {
  const { setShowTheNetQ } = useContext(AppContext);

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
          onClick={() => setShowTheNetQ(false)}
          className="text-3xl text-white absolute top-3 right-3 cursor-pointer hover:text-red-600 hover:scale-105"
        />
        <h1 className=" play text-center text-xl sm:text-2xl text-white font-medium">
          Bet on 2 Quads : 100 <br /> Bet on 1 Line : 50
        </h1>
        <img src={thenet} width={600} />
        <h2 className=" play text-center text sm:text-2xl text-white font-medium">
          Always pick both quadrants
          <br />
          which are high in last 50-100 rounds.
          <br />
          Also go for 1 line (6's) which have more hot numbers <br /> - check
          Statistics
        </h2>
      </div>
    </div>
  );
};

export default TheNetQ;
