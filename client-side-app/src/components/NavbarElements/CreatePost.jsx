import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import serverURI from "../../../serverURI";

export default function CreatePost() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipeInstruction, setRecipeInstruction] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      fetch(`${serverURI}/users`)
        .then((res) => res.json())
        .then((data) => {
          const userData = data.find((u) => user.email == u.email);
          if (userData) {
            setCurrentUser(userData._id);
          }
        });
    }
  }, [isAuthenticated, user]);

  function handleClick(e) {
    e.preventDefault();
    const recipeData = {
      authorName: authorName,
      recipeName: recipeName,
      recipeDescription: recipeDescription,
      recipeInstruction: recipeInstruction,
      recipeUrl: recipeUrl,
      recipeUserId: currentUser,
    };

    fetch(`${serverURI}/createPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data sent to backend of create post", data);
      })
      .catch((err) => {
        console.error("error in sending data to backend", err);
      });
    setAuthorName("");
    setRecipeDescription("");
    setRecipeName("");
    setRecipeUrl("");
    setRecipeInstruction("");
    navigate("/dashboard");
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col h-[100vh] ">
        <div className=" w-[85%] md:w-[50%]  flex flex-col gap-10 justify-center  bg-white p-20 rounded-md sm:mt-10  sm:mb-10  h-auto lg:h-auto lg:p-10 lg:mt-20 lg:mb-20  ">
          <h1 className="text-center sm:text-2xl md:text-3xl font-semibold">
            Share Your Delicious Creation
          </h1>
          <input
            className="border  border-black rounded-md p-2 "
            type="text"
            placeholder="Recipe author name"
            onChange={(e) => setAuthorName(e.target.value)}
            value={authorName}
          />

          <input
            className="border  border-black rounded-md p-2"
            type="text"
            placeholder="Recipe name"
            onChange={(e) => setRecipeName(e.target.value)}
            value={recipeName}
          />

          <textarea
            className="border  border-black rounded-md p-2 h-auto  "
            name=""
            placeholder="Recipe description (max 30 words)"
            cols="50"
            id=""
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
          ></textarea>
          <textarea
            className="border  border-black rounded-md p-2 h-auto  "
            name=""
            placeholder="Recipe Instructions"
            cols="50"
            id=""
            value={recipeInstruction}
            onChange={(e) => setRecipeInstruction(e.target.value)}
          ></textarea>
          <input
            className="border  border-black rounded-md p-2"
            type="url"
            placeholder="Recipe URL (use direct links in jpg/png format)"
            value={recipeUrl}
            onChange={(e) => setRecipeUrl(e.target.value)}
          />
          <button
            className="bg-orange-900 p-1 rounded-md text-white "
            type="submit"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {" "}
            Save
          </button>
        </div>
      </div>
    </>
  );
}
