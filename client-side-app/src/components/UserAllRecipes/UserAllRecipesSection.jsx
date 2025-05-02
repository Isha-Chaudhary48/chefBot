import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dummyProfile from "../../assets/dummyProfile.png";

export default function UserAllRecipesSection() {
  const location = useLocation();
  const recipe = location.state?.recipe;
  const [particularUserRecipes, setParticularUserRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (recipe?.recipeUserId) {
      fetch(
        `https://chef-bot-frontend.vercel.app/usersProfile/${recipe.recipeUserId._id}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              "Error in fetching data from backend at userAllRecipesSection"
            );
          }
          return res.json();
        })
        .then((data) => {
          setParticularUserRecipes(data);
        });
    }
  }, [recipe]);

  function navigateOnClick(recipe) {
    navigate(`/userPostedRecipes/${recipe._id}`, { state: { recipe } });
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center">Recipe Not Found!</div>
    );
  }

  const user = particularUserRecipes[0]?.recipeUserId;

  return (
    <div className="flex justify-center items-center flex-col">
      {particularUserRecipes.length === 0 ? (
        <div className="flex justify-center items-center text-white">
          No Recipe of this user found
        </div>
      ) : (
        <>
          {user && (
            <div className=" p-4 mt-4 rounded-md shadow-md flex flex-col items-center ">
              <img
                loading="lazy"
                src={
                  user.picture && user.picture.trim() !== ""
                    ? recipe.recipeUserId.picture
                    : dummyProfile
                }
                // due to slow internet it will not able to load
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyProfile;
                }}
                className="rounded-full h-32 w-32 "
              />
              <h1 className="text-xl text-white font-semibold">{user.name}</h1>
            </div>
          )}

          {particularUserRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="flex justify-center flex-col bg-white gap-7 p-10 mt-10 w-[88%] md:w-[60%]  rounded-lg    "
              onClick={() => navigateOnClick(recipe)}
            >
              <div className="flex justify-normal items-end mt-[-20px]">
                <p className="text-gray-600 ml-4">
                  posted on :{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(recipe.createdAt))}
                </p>
              </div>
              <div className="text-3xl text-center uppercase font-semibold">
                {recipe.recipeName}
              </div>
              <div className="flex justify-center items-center w-full">
                <img
                  src={recipe.recipeUrl}
                  className="h-[400px] w-[400px] m-6 md:h-[400px] md:w-[400px] rounded-md"
                  alt={recipe.recipeName}
                />
              </div>
              <h1 className="text-2xl uppercase font-semibold">Description:</h1>
              <div className="text-xl ">{recipe.recipeDescription}</div>
              <div className="flex justify-end items-end text-black font-bold">
                <h1> — {recipe.authorName}</h1>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
