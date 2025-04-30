import mongoose from "mongoose";

const recipeUserSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    recipeName: {
      type: String,
      required: true,
      trim: true,
    },
    recipeDescription: {
      type: String,
      required: true,
      trim: true,
    },
    recipeInstruction: {
      type: String,
      required: true,
      trim: true,
    },
    recipeUrl: {
      type: String,
      required: true,
      trim: true,
    },
    recipeUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const RecipeUser = mongoose.model("RecipeUser", recipeUserSchema);
export default RecipeUser;
