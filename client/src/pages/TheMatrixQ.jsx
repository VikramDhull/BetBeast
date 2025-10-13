import React, { useContext, useEffect } from "react";
import thematrix from "../assets/thematrix.jpg";
import { AppContext } from "../Context/AppContext";
import { MdClose } from "react-icons/md";

const TheMatrixQ = () => {
  const { setShowTheMatrixQ } = useContext(AppContext);

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
          onClick={() => setShowTheMatrixQ(false)}
          className="text-3xl text-white absolute top-3 right-3 cursor-pointer hover:text-red-600 hover:scale-105"
        />
        <h1 className=" play text-center text-xl sm:text-2xl text-white font-medium">
          RED / EVEN / BIG : 500 <br /> QUAD: 2,3 / COL: 1,2 : 500
        </h1>
        <img src={thematrix} width={600} />
        <h2 className=" play text-center text-md sm:text-2xl text-white font-medium">
          input you initial bet amount
          <br />
          according to your budget
          <br />
          and follow the plan
        </h2>
      </div>
    </div>
  );
};

export default TheMatrixQ;
