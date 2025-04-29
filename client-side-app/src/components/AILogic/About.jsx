import { useState } from "react";
import InputFile from "./InputFile";

import IngredientList from "./IngredientList";

export function About() {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [aiResponse, setAIResponse] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const getAiResponse = async () => {
    setShowContent(true);
    try {
      const response = await fetch("http://localhost:3000/chefBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientsArray }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      // ai response

      setAIResponse(data.aiResponse);
    } catch (error) {
      console.log("error in Ai response", error);
    }
  };

  function addList(nextVal) {
    if (nextVal.trim() !== "")
      setIngredientsArray([...ingredientsArray, nextVal.trim()]);
  }

  console.log(ingredientsArray);

  return (
    <>
      <InputFile addList={addList} />

      <IngredientList
        ingredientsArray={ingredientsArray}
        getAiResponse={getAiResponse}
        aiResponse={aiResponse}
        showContent={showContent}
      />
    </>
  );
}
