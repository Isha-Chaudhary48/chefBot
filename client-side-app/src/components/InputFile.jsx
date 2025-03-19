import { useState } from "react";
import IngredientList from "./IngredientList";
import pizzaChef from "../assets/pizzaChef.jpg";
import pancake1 from "../assets/pancake1.avif";
import burger1 from "../assets/burger1.avif";

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
      <div className="grid grid-cols-3 gap-3 p-4 ">
        <img
          className="h-auto w-[100%] m-auto  mt-4 rounded-md "
          src={pizzaChef}
          alt=""
        />
        <img
          className="h-auto w-[100%] m-auto  mt-4 rounded-md "
          src={burger1}
          alt=""
        />
        <img
          className="h-auto w-[100%] m-auto  mt-4 rounded-md "
          src={pancake1}
          alt=""
        />
      </div>
      <form className="flex justify-center items-center align-bottom  gap-3 mt-16 ">
        <input
          className="rounded-md border border-gray-300 p-2 shadow-sm flex-grow min-w-[150px] max-w-[400px] "
          type="text"
          name="inputName"
          value={inputIngredient}
          onChange={(e) => setInputIngredient(e.target.value)}
          placeholder="e.g. oregano"
        />
        <button
          className="rounded-md p-[9px_13px] bg-[#141413] text-white text-sm w-[150px]"
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
