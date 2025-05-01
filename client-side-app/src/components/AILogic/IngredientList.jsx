export default function IngredientList(props) {
  return (
    <>
      {props.ingredientsArray.length > 0 && (
        <div className="mt-14 h-auto w-full  flex justify-center flex-col items-center     ">
          <h1 className=" text-xl sm:text-2xl      mb-4 text-white  ">
            Ingredients on hand :
          </h1>
          {props.ingredientsArray.map((item, index) => (
            <ul key={index} className=" h-auto w-1/2  rounded-lg mt-4">
              <li className="list-none bg-white text-black-500 mt-2 h-10 sm:min-w-72 sm: max-w-auto rounded-md text-center align-middle p-2  ">
                {item}
              </li>
            </ul>
          ))}

          {props.ingredientsArray && props.ingredientsArray.length > 0 && (
            <div className="w-1/2 h-auto bg-[#825d3f] text-white p-8 sm:p-10 rounded-lg mt-16 mb-8">
              <h1 className="sm:text-xl font-black">Ready for a recipe?</h1>
              <button
                onClick={props.getAiResponse}
                className="sm:h-auto  bg-white rounded-lg text-black font-semibolds p-1  sm:p-2 float-right mt-2 "
              >
                Get Recipe
              </button>

              <div className="mt-10 text-md sm:text-lg ">
                Generate a recipe from your list of ingredients
              </div>
            </div>
          )}

          {props.showContent && (
            <div className=" flex justify-center  p-10 rounded-sm ">
              {!props.aiResponse ? (
                <h1 className="text-2xl text-white font-medium mb-4">
                  Loading...
                </h1>
              ) : (
                <div className="bg-white flex justify-center items-center flex-col w-2/3 p-10 rounded-sm">
                  <h1 className="text-2xl font-bold mb-3">レシピ (Recipe)</h1>
                  <h2 className="flex justify-center items-center flex-col ">
                    {props.aiResponse}
                    <p className="text-2xl font-bold mb-3 mt-2">Bon appétit!</p>
                  </h2>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
