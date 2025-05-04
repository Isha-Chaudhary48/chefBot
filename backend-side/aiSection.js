import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
console.log();

export default async function geminiAi(ingredients) {
  try {
    const prompt = `suppose you are a Michelin star chef give  two recipes which are simple to make and give them in bullet points only in 5-6 points or if they give a name of food please give its recipe both the recipe should be about that food only: ${ingredients}`;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log("error in fetching data", error);
  }
}
