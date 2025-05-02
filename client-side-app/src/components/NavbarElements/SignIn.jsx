import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import serverURI from "../../../serverURI";
export function SignIn() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const hasPostedUser = useRef(false);
  useEffect(() => {
    if (!user || !isAuthenticated || hasPostedUser.current) return;
    const userData = {
      name: user.name,
      email: user.email,
      picture: user.picture,
    };

    fetch(`${serverURI}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        // handle 500 errors
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("data from backend", data);
      })
      .catch((err) => {
        // handle any exception
        console.error("error in sending data to backend", err);
      });
  }, [user, isAuthenticated]);

  return (
    <>
      <div className="flex flex-col  justify-center items-center md:flex-row  ">
        {isAuthenticated ? (
          <button
            className=" sm:hover:text-[#fab668] md:text-black  md:hover:text-gray-600 sm:text-white     "
            onClick={(e) => logout(e)}
          >
            LOGOUT
          </button>
        ) : (
          <button
            className=" sm:hover:text-[#fab668] md:text-black md:hover:text-gray-600  sm:text-white    "
            onClick={(e) => loginWithRedirect(e)}
          >
            SIGN IN
          </button>
        )}
      </div>
    </>
  );
}
