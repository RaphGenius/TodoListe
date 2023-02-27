import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
function DarkMode({ isSetMode, setMode }) {
  return (
    <button
      aria-labelledby="Switch between dark and light mode"
      className="p-2 absolute left-0 top-0 cursor-pointer text-xl "
      onClick={() => isSetMode(setMode === "light" ? "dark" : "light")}
    >
      {setMode === "light" ? (
        <BsSun color="yellow" />
      ) : (
        <BsMoon color="white" />
      )}
    </button>
  );
}

export default DarkMode;
