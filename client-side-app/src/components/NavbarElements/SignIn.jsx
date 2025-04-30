import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
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

    fetch("http://localhost:3000/user", {
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
      <div className="flex flex-col md:flex-row ">
        {isAuthenticated ? (
          <button
            className="relative sm:text-white sm:hover:text-[#fab668]  md:text-gray-600 md:hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
            onClick={(e) => logout(e)}
          >
            Logout
          </button>
        ) : (
          <button
            className="relative sm: text-white sm:hover:text-[#fab668] md:text-gray-600 md:hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
            onClick={(e) => loginWithRedirect(e)}
          >
            SignIn
          </button>
        )}
        {isAuthenticated && user && (
          <img
            className="h-12 rounded-[50%] z-50 bg-white mt-4 md:ml-4 md:mt-0"
            src={user.picture}
            alt="hello "
          />
        )}
      </div>
    </>
  );
}
