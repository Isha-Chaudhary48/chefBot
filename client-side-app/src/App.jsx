import "./App.css";

import InputFile from "./components/inputFile";
import Navbar from "./components/Navbar";
import IngredientList from "./components/IngredientList";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [aiResponse, setAIResponse] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const getAiResponse = async () => {
    setShowContent(true);
    try {
      const response = await fetch("http://localhost:3000", {
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
      <Navbar />

      <InputFile addList={addList} />

      <IngredientList
        ingredientsArray={ingredientsArray}
        getAiResponse={getAiResponse}
        aiResponse={aiResponse}
        showContent={showContent}
      />

      <Footer />
    </>
  );
}

export default App;
