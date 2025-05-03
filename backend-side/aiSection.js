import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function isCookingRelated(input) {
  try {
    const classifyPrompt = `
okay now i'll give you certain words and you have to tell me whether its cooking realated or not you only have to give response in one world and there should not be extra word in your response only one word

Message: ${input}

  `;
    const result = await model.generateContent(classifyPrompt);
    const topic = result.response.text().trim().toLowerCase();
    console.log("input", input);
    console.log("topic", topic);
    return topic;
  } catch (error) {
    console.error("Error in classification prompt:", error);
    return "non-cooking"; // fallback to deny if AI fails
  }
}
export default async function geminiAi(ingredients) {
  try {
    const classification = await isCookingRelated(ingredients);
    console.log("classification", classification);

    if (classification !== "cooking") {
      return "non-cooking";
    }
    if (classification === "cooking") {
      const prompt = `Suppose you are Michelin star chef. Give two recipes which are simple to make in bullet points  (5–6 steps each). If the input is a dish name, provide two recipes for that dish only if its about non-cooking return result that please write ingredients of hte recipe : ${ingredients}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error) {
    console.log("error in fetching data from AI");
    return "Sorry, something went wrong while processing your request.";
  }
}
