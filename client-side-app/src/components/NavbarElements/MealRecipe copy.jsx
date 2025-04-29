import React from "react";
import { useLocation } from "react-router-dom";

function MealRecipe() {
  const location = useLocation();
  const meal = location.state;
  if (!meal) return <h1>No meal data avaliable</h1>;
  return (
    <div className="flex justify-center items-center flex-col pt- sm:p-10 font-serif">
      <h1 className="text-xl sm:text-3xl text-white font-semibold">
        {meal.name} ({meal.area})
      </h1>

      <img
        className="h-[40%] w-[70%] sm:h-[28%] sm:w-[28%] mt-8 rounded-lg mb-4"
        src={meal.image}
        alt=""
      />

      <h1 className="bg-white p-8 rounded-md w-5/6 flex justify-center items-center flex-col">
        {meal.instructions}
        <p className="font-semibold text-2xl p-2">Enjoy!!</p>
      </h1>
    </div>
  );
}

export default MealRecipe;
