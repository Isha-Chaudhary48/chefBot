import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dummyProfile from "../../assets/dummyProfile.png";
import serverURI from "../../../serverURI";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${serverURI}/postedRecipes`)
      .then((res) => res.json())
      .then((data) => {
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
    // remaining ...

    navigate(`/userPostedRecipes/${recipe._id}`, { state: { recipe } });
  }
  function userRecipesOnClick(recipe) {
    navigate(`/userAllRecipes/${recipe.recipeUserId._id}`, {
      state: { recipe },
    });
  }

  return (
    <>
      <div className=" flex justify-center items-center rounded-md sm:h-[80px] w-[100%] sm:mt-10 md:float-end lg:mt-10   mr-4     mouse-pointer mb-10   ">
        <div className=" bg-white  rounded-md  p-2 text-xl flex justify-center">
          <button
            className="p-2 uppercase font-semibold "
            onClick={(e) => handleClick(e)}
          >
            Create Post
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col gap-20  mt-24 gap- lg:mt-10 p-4 ">
        {userInfo.length === 0 ? (
          <div className="text-white text-3xl text-center h-[50vh] ">
            Loading...
          </div>
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
                  loading="lazy"
                  src={
                    recipe.recipeUserId.picture &&
                    recipe.recipeUserId.picture.trim() !== ""
                      ? recipe.recipeUserId.picture
                      : dummyProfile
                  }
                  // due to slow internet it will not able to load
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
                <h2 className="text-black text-3xl   mt-6 mb-6  ml-4 text-center uppercase font-semibold">
                  {recipe.recipeName}
                </h2>
                <div className="md:grid md:grid-cols-2">
                  <div className="flex justify-center items-center">
                    <img
                      src={recipe.recipeUrl}
                      alt={`${recipe.authorName}'s profile`}
                      className="object-cover overflow-hidden h-[300px] w-[300px]  m-6 md:h[400px] md:w-[400px] rounded-md"
                    />
                  </div>

                  <div className="flext justify-center items-center">
                    <h1 className="    text-2xl text-wrap m-5 uppercase font-semibold">
                      Description:
                    </h1>
                    <h2 className="text-gray-700 sm:text-lg    md:text-xl text-wrap m-5">
                      {recipe.recipeDescription}
                    </h2>
                    <h1 className="flex justify-end mr-9 text-black font-bold">
                      — {recipe.authorName}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
