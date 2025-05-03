import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profilePicture from "../../assets/profilePicture.png";

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
      <div className="flex justify-center items-center ">
        <div className="bg-white  sm:flex sm:flex-col  p-4 rounded-lg   justify-center w-[80%]  ">
          <div
            className="flex justify-start items-center gap-2 cursor-pointer"
            onClick={() => {
              navigateOnClick(recipe);
            }}
          >
            <img
              loading="lazy"
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
              className="rounded-full h-12 w-12"
            />
            <h1 className="uppercase">{recipe.recipeUserId.name}</h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex md:justify-end">
              <p className=" text-gray-600 ml-4    ">
                posted on :{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(recipe.createdAt))}
              </p>
            </div>
          </div>
          <h2 className="text-black text-3xl md:text-5xl   mt-6 mb-6  ml-4 text-center uppercase font-semibold">
            {recipe.recipeName}
          </h2>
          <div className="lg:grid lg:grid-cols-2">
            <div className="flex justify-center items-center">
              <img
                src={recipe.recipeUrl}
                alt={`${recipe.authorName}'s profile`}
                className="object-cover overflow-hidden h-[400px] w-[400px]  m-6 md:h[400px] md:w-[400px] sm:rounded-full md:rounded-full lg:rounded-md"
              />
            </div>

            <div className="flext justify-center items-center">
              <h1 className="    text-2xl text-wrap m-5 uppercase font-semibold">
                Description:
              </h1>
              <h2 className="text-gray-700 sm:text-xl    md:text-xl text-wrap m-5">
                {recipe.recipeDescription}
              </h2>
              <h1 className="  text-2xl text-wrap mt-4 ml-4 uppercase font-semibold">
                Instructions:
              </h1>
              <h2 className="  p-4 text-xl text-wrap text-gray-600 ">
                {recipe.recipeInstruction}
              </h2>
              <h1 className="flex justify-end mr-9 text-black font-bold">
                — {recipe.authorName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
