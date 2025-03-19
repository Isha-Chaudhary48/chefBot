export default function IngredientList(props) {
  return (
    <>
      {props.ingredientsArray.length > 0 && (
        <div className="mt-20 h-auto w-full  flex justify-center flex-col items-center font-serif">
          <h1 className="text-2xl font-serif mb-4 text-[#1d150c] font-semibold ">
            Ingredients on hand :
          </h1>
          {props.ingredientsArray.map((item, index) => (
            <ul key={index} className=" h-auto w-1/2  rounded-lg mt-4">
              <li className="list-none bg-white text-black-500 mt-2 h-10 min-w-72 max-w-auto rounded-md text-center align-middle p-2  ">
                {item}
              </li>
            </ul>
          ))}

          {props.ingredientsArray && props.ingredientsArray.length > 3 && (
            <div className="w-1/2 h-auto bg-[#4d361c] text-white  p-10 rounded-lg mt-16 mb-8">
              <h1 className="text-xl font-black">Ready for a recipe?</h1>
              <button
                onClick={props.getAiResponse}
                className="h-auto  bg-white rounded-lg text-black font-semibolds p-2 float-right"
              >
                Get Recipe
              </button>

              <div className="mt-4 ">
                Generate a recipe from your list of ingredients
              </div>
            </div>
          )}

          {props.showContent && (
            <div className=" flex justify-center  p-10 rounded-sm ">
              {!props.aiResponse ? (
                <h1 className="text-2xl font-medium mb-4">Loading...</h1>
              ) : (
                <div className="bg-white flex justify-center items-center flex-col w-1/2 p-10 rounded-sm">
                  <h1 className="text-2xl font-bold mb-3">レシピ (Recipe)</h1>
                  <h2 className="flex justify-center items-center flex-col ">
                    {props.aiResponse}
                    <h1 className="text-2xl font-bold mb-3 mt-2">
                      Bon appétit!
                    </h1>
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
