import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dummyProfile from "../../assets/dummyProfile.png";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/postedRecipes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
        setError(null);
      })
      .catch((err) => {
        console.error("error in fetching data from backend", err);
        setError("Try again later!");
        console.log("error", error);
      });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    if (!isAuthenticated || !user?.email) {
      toast.error("please sign in first!");
      return;
    }
    navigate("/createPost");
  }
  function navigateOnClick(recipe) {
    if (!isAuthenticated || !user?.email) {
      toast.error("please sign in first!");
      return;
    }

    // remaining ...

    navigate(`/userPostedRecipes/${recipe._id}`, { state: { recipe } });
  }
  function userRecipesOnClick(recipe) {
    if (!isAuthenticated || !user?.email) {
      toast.error("please sign in first!");
      return;
    }

    navigate(`/userAllRecipes/${recipe.recipeUserId._id}`, {
      state: { recipe },
    });
  }

  return (
    <>
      <div className="bg-white flex justify-center items-center rounded-md sm:h-[80px] sm:w-[120px] md:h-[80px] md:w-[180px] float-end lg:mt-10 sm:mt-3  mr-4 font-serif  mouse-pointer  ">
        <div className="text-xl">
          <button onClick={(e) => handleClick(e)}>Create Post</button>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col gap-20  mt-10 gap- lg:mt-10 p-4 ">
        {!userInfo ? (
          <div className="text-white text-xl ">Loading...</div>
        ) : (
          userInfo.map((recipe, index) => (
            <div
              className="bg-white sm:w-[65%] sm:flex sm:flex-col  md:w-[70%] p-4 rounded-lg md:grid md:grid-cols-2  justify-center cursor-pointer "
              key={index}
            >
              <div
                className="flex justify-start items-center gap-2"
                onClick={() => userRecipesOnClick(recipe)}
              >
                <img
                  src={
                    recipe.recipeUserId.picture &&
                    recipe.recipeUserId.picture.trim() !== ""
                      ? recipe.recipeUserId.picture
                      : dummyProfile
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = dummyProfile;
                  }}
                  className="rounded-full h-12 w-12 "
                />
                <h1 className="cursor-pointer">{recipe.recipeUserId.name}</h1>
              </div>
              <div
                className="md:col-span-2"
                onClick={() => navigateOnClick(recipe)}
              >
                <p className="mt-2 text-gray-600 ml-4  ">
                  posted on :{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(recipe.createdAt))}
                </p>

                <h2 className="text-black text-3xl font-serif md: mt-5  ml-4 text-center">
                  {recipe.recipeName}
                </h2>

                <div className="flex justify-center items-center">
                  <img
                    src={recipe.recipeUrl}
                    alt={`${recipe.authorName}'s profile`}
                    className="h-[300px] w-[300px]  m-6 md:h[300px] md:w-[300px] rounded-mdssss"
                  />
                </div>

                <div className="flext justify-center items-center">
                  <h1 className="sm:text-lg font-serif md:text-2xl text-wrap m-5">
                    Description:
                  </h1>
                  <h2 className="text-gray-700 sm:text-lg font-serif md:text-xl text-wrap m-5">
                    {recipe.recipeDescription}
                  </h2>
                  <h1 className="flex justify-end mr-9">
                    — {recipe.authorName}
                  </h1>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
