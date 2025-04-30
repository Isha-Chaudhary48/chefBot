import express from "express";
import "dotenv/config";
import cors from "cors";
import recipeRoutes from "./routes.js";
import connectDB from "./dbConnection.js";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/", recipeRoutes);

app.listen(3000, () => {
  console.log("server is running  ");
});
