import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profilePicture from "../../assets/profilePicture.png";
import LikeShareComment from "../LikeShareCommentSection/LikeShareComment";

export default function UserPostedRecipes() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state?.recipe;
  console.log("recipe", recipe);

  if (!recipe)
    return (
      <div className="flex justify-center items-center mt-32">
        <h1 className="text-2xl text-white top-6">Recipe not found</h1>;
      </div>
    );
  function navigateOnClick(recipe) {
    navigate(`/userAllRecipes/${recipe.recipeUserId._id}`, {
      state: { recipe },
    });
  }
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white  sm:flex sm:flex-col  p-4 rounded-lg lg:grid lg:grid-cols-2  justify-center w-[80%]  ">
          <div
            className="flex justify-start items-center gap-2 cursor-pointer"
            onClick={() => {
              navigateOnClick(recipe);
            }}
          >
            <img
              src={
                recipe.recipeUserId.picture &&
                recipe.recipeUserId.picture.trim() !== ""
                  ? recipe.recipeUserId.picture
                  : profilePicture
              }
              // due to slow internet it will not able to load
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = profilePicture;
              }}
              className="rounded-full h-12 w-12 "
            />
            <h1>{recipe.recipeUserId.name}</h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex md:justify-end">
              <p className=" text-gray-600 ml-4 md:col-span-2    ">
                posted on :{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(recipe.createdAt))}
              </p>
            </div>

            <p className="text-black text-4xl text-center sm:text-center lg:text-center md:text-5xl font-serif pt-6  mb-4 mt-4     ">
              {recipe.recipeName}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              src={recipe.recipeUrl}
              alt={`${recipe.recipeName}`}
              className=" w-[370px]  h-[370px] m-6  md:w-[500px] md:h-[500px]  p-2 md:p-0 mt-10 md:mt-0 rounded-full"
            />
          </div>

          <div className="flext justify-center items-center">
            <h1 className=" font-serif text-2xl text-wrap m-5">Description:</h1>
            <h2 className="text-gray-700  font-serif text-xl text-wrap m-5">
              {recipe.recipeDescription}
            </h2>
            <h1 className=" font-serif text-2xl text-wrap mt-4 ml-4">
              Instructions:
            </h1>
            <h2 className="font-serif p-4 text-xl text-wrap text-gray-600 ">
              {recipe.recipeInstruction}
            </h2>
            <h1 className="flex justify-end mr-9">— {recipe.authorName}</h1>
          </div>
          <LikeShareComment />
        </div>
      </div>
    </>
  );
}
