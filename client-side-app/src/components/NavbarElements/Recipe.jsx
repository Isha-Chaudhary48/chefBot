import { useEffect, useState } from "react";
import video1 from "../../assets/video1.mp4";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

export function Recipe() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const [searchMeal, setSearchMeal] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [query, setQuery] = useState("");
  const [imageOnclickRecipe, setImageOnclick] = useState({
    name: "",
    id: "",
    area: "",
    instructions: "",
  });
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (query.trim() == "") return;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => setSearchMeal(data))
      .catch((error) => console.log("error in fething data", error));
  }, [query]);

  function handleClick() {
    if (!isAuthenticated) {
      toast.error("Sign In first!");
      return;
    }
    if (inputVal.trim() == "") return;
    setQuery(inputVal);
    setInputVal("");
    setContentVisible(true);
  }

  console.log("search Meal", searchMeal);
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick({});
    }
  }

  function handleImageClick(
    strMeal,
    idMeal,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube
  ) {
    setImageOnclick({
      name: strMeal,
      id: idMeal,
      area: strArea,
      instructions: strInstructions,
      image: strMealThumb,
      video: strYoutube,
    });
    navigate(`/meal/${idMeal}`, {
      state: {
        name: strMeal,
        id: idMeal,
        area: strArea,
        instructions: strInstructions,
        image: strMealThumb,
        video: strYoutube,
      },
    });
  }
  console.log(imageOnclickRecipe);

  return (
    <>
      <div className="  flex flex-col gap-6 justify-center items-center mt-8   ">
        <h1 className=" text-center w-[95%] md:w-[80%]  text-white     p-8 text-xl sm:text-2xl rounded-md">
          Whether it’s cozy breakfast ideas or dreamy dinner plans, just type it
          in. We’ll whisk up the perfect recipe, rich with flavor and ready to
          impress—right on your screen
        </h1>
        <h1 className="w-[90%] md:w-[70%] bg-[#825d3f] text-white text-center    p-8 text-xl sm:text-2xl rounded-md">
          Craving something delicious? Just type a dish name and unlock its
          secret recipe!
        </h1>
      </div>

      <div className="flex justify-center items-center mt-10 ">
        <input
          className="h-[40px] w-[40%]  rounded-md  p-2"
          type="text"
          name=""
          id=""
          placeholder="Search Meal"
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={(e) => handleClick(e)}
          className="h-[40px] w-auto ml-4 bg-[#6e5134] text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>

      {contentVisible && (
        <div className="flex justify-center items-center ">
          {searchMeal?.meals?.length > 0 ? (
            <div className=" grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center text-center align-middle items-center p-16 h-auto w-auto text-black ">
              {searchMeal.meals.map((item, index) => {
                console.log("item", item);
                return (
                  <>
                    <div>
                      <div
                        className="hover: scale-100 ease-in duration-100"
                        key={item.idMeal + index}
                      >
                        <img
                          key={item.idMeal}
                          className="rounded-md transition-transform duration-250 ease-in-out hover:scale-105 sm:w-[300px] sm:h-[300px] md:h-auto md:w-auto "
                          src={item.strMealThumb}
                          alt=""
                          onClick={() =>
                            handleImageClick(
                              item.strMeal,
                              item.idMeal,
                              item.strArea,
                              item.strInstructions,
                              item.strMealThumb,
                              item.strYoutube
                            )
                          }
                        />

                        <h1
                          className="font-semibold p-4 text-lg  text-white text-center
                        "
                        >
                          {item.strMeal}
                        </h1>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 mb-10     sm:text-2xl bg-[#825d3f] h-32 flex justify-center items-center p-4 rounded-md text-white">
              <h1>
                Can't find recipe then ask
                <a
                  className=" text-white p-2 rounded-md ml-2 sm:text-lg bg-[#1a1a19]"
                  href="/chefBot"
                >
                  ChefBot
                </a>
              </h1>
            </div>
          )}
        </div>
      )}
      <div className="  h-[400px]  m-auto sm:mt-28 md:mt-14 flex justify-center items-center  p-4 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent rounded-lg z-10">
        <video
          className="h-[90%] w-auto rounded-md "
          // autoPlay
          loop
          controls
          muted
          // onLoadStart={video1}
          src={video1}
        ></video>
      </div>
    </>
  );
}
