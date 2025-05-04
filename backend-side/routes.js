import express from "express";
import User from "./databaseSchema/user.js";
import geminiAi from "./aiSection.js";
import RecipeUser from "./databaseSchema/recipeUsers.js";

const router = express.Router();

router.post("/chefBot", async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    const aiResponse = await geminiAi(ingredients.join(","));
    res.json({ aiResponse: aiResponse });
  } catch (error) {
    console.log("error in Ai processing request", error);
    res.status(500).json({ error: "Internal server error in ai" });
  }
});

router.post("/user", async (req, res) => {
  try {
    const userData = req.body;
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      console.log("user exists");
      return res.status(200).json({ message: "user already exists" });
    } else {
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      });
      await newUser.save();
      console.log("user created", newUser);
      return res.status(200).json({ message: "user created" });
    }
  } catch (err) {
    console.log("error in creating user", err);
    return res
      .status(500)
      .json({ error: "Internal server error in making user", err });
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("error in fetching users", err);
    res
      .status(500)
      .json({ error: "internal server error at fetching users", err });
  }
});

router.post("/createPost", async (req, res) => {
  try {
    const {
      authorName,
      recipeName,
      recipeDescription,
      recipeInstruction,
      recipeUrl,
      recipeUserId,
    } = req.body;
    const newRecipeUser = new RecipeUser({
      recipeUserId: req.body.recipeUserId,
      authorName: authorName,
      recipeName: recipeName,
      recipeDescription: recipeDescription,
      recipeInstruction: recipeInstruction,
      recipeUrl: recipeUrl,
      recipeUserId: recipeUserId,
    });
    await newRecipeUser.save();
    console.log("recipe user created", newRecipeUser);
    res.status(200).json({ message: "recipe user data saved successfully" });
  } catch (error) {
    console.log("error in creating recipe user", error);
    res
      .status(500)
      .json({ error: "recipe user not saved successfully", error });
  }
});
router.get("/postedRecipes", async (req, res) => {
  try {
    const getData = await RecipeUser.find().populate(
      "recipeUserId",
      "name email picture"
    );

    console.log("getData successfully", getData);
    res.status(200).json(getData);
  } catch (error) {
    console.log("error in getting data from db", error);
    res
      .status(500)
      .json({ message: "error in getting data from recipeuser db", error });
  }
});
router.get("/usersProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await RecipeUser.find({ recipeUserId: id }).populate(
      "recipeUserId"
    );
    res.status(200).json(userProfile);
  } catch (err) {
    console.log("error in getting user all recipes", err);
    res.status(500).json({ error: "error in gettin user all recipes" });
  }
});

export default router;
