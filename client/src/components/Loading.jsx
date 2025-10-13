import React, { useEffect } from "react";
import { Mosaic } from "react-loading-indicators";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/5 flex justify-center items-center transition-opacity duration-300">
      <Mosaic color="#dc2626" size="small" text="" textColor="" />
    </div>
  );
};

export default Loading;
