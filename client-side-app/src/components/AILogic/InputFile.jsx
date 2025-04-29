import { useState } from "react";

import { scrollImages } from "../../components/scrollImages";

import Marquee from "react-fast-marquee";

export default function InputFile(props) {
  const [inputIngredient, setInputIngredient] = useState("");

  function handleSave(e) {
    e.preventDefault();
    if (inputIngredient.trim() === "") {
      setInputIngredient("");
      return;
    }

    props.addList(inputIngredient.trim());
    setInputIngredient("");
  }

  return (
    <>
      <div className="w-full sm:w-[90%]  h-[300px]  m-auto  mt-4 flex justify-center items-center bg-gradient-to-r from-transparent via-gray-400/10 to-transparent p-4 rounded-lg ">
        <Marquee>
          {scrollImages.map((item) => (
            <img
              className="w-[180px] rounded-xl cursor-pointer hover:scale-95 ease-in-out duration-90 ml-6 sm:w-[270px]"
              key={item.id}
              src={item.src}
              alt="/"
            />
          ))}
        </Marquee>
      </div>

      <div className="  flex justify-center items-center mt-8   ">
        <h1 className="w-1/2 bg-[#825d3f] text-white font-serif p-6 sm:p-8  text-lg  sm:text-xl md:text-2xl lg:text-2xl rounded-md">
          Type your favorite ingredient, and let AI find a recipe for you!
        </h1>
      </div>
      <form className="flex justify-center items-center align-bottom  gap-3 mt-16 flex-col sm:flex-row md:flex-row lg:flex-row   ">
        <input
          className="rounded-md border border-gray-300 p-2 shadow-sm flex-grow min-w-[150px] max-w-[400px] sm:w-9 md:w-12 lg:w-20 "
          type="text"
          name="inputName"
          value={inputIngredient}
          onChange={(e) => setInputIngredient(e.target.value)}
          placeholder="e.g. oregano"
        />
        <button
          className="rounded-md p-[9px_13px] bg-[#6e5134] text-white text-sm w-[150px]"
          onClick={(e) => {
            handleSave(e);
          }}
        >
          + Add ingredients
        </button>
      </form>
    </>
  );
}
