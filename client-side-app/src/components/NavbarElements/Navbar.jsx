import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import chefIcon from "../../assets/chefIcon.png";
import { SignIn } from "./SignIn";
import { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const menuRef = useRef(null); // reference to the hamburger menu
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside, { capture: true });

    return () => {
      window.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
  }, []);
  return (
    <>
      <div className="flex h-20 w-[100vw] bg-white text-black       rounded-bl-sm font-normal shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.05),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.8)] mb-20 ">
        <div className=" flex  justify-start items-center    ml-3 p-2 text-2xl h-20 w-full ">
          <img className="w-10 h-10 mr-2" src={chefIcon} alt="" />
          <span className="font-semibold">CHEF TABLE</span>
        </div>

        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="md:hidden flex justify-center items-center mr-10"
        >
          {isOpen ? (
            <X
              size={32}
              onClick={() => setIsOpen(false)}
              className="z-50 text-center mt-10 md:mr-5  text-white fixed    "
            />
          ) : (
            <Menu size={32} className="" />
          )}
        </button>

        <div className="md:w-full   hidden md:grid grid-cols-5 md:text-[12px] lg:text-[16px] justify-center items-center h-20     gap-3  text-center ">
          <Link to="/dashboard" className="  text-black hover:text-gray-600  ">
            DASHBOARD
          </Link>
          <Link to="/chefBot" className=" text-black hover:text-gray-600    ">
            CHEFBOT
          </Link>
          <Link
            to="/recipe"
            className="relative  text-black hover:text-gray-600     "
          >
            RECIPES
          </Link>
          <div>
            {" "}
            <SignIn />
          </div>
          <div>
            {isAuthenticated && user && (
              <img
                className=" md:h-10 md:w-10 h-12 w-12 rounded-[50%]"
                src={user.picture}
              />
            )}
          </div>
        </div>
        {isOpen && (
          <div
            ref={menuRef}
            className={` z-30 pl-10 pr-10 fixed right-0 h-[100%] w-[40%] text-white  flex flex-col justify-center items-center   md:hidden  bg-[#4b3624]
           `}
          >
            <div className=" fixed  h-full   text-white shadow-lg flex justify-center items-center  flex-col  gap-8 p-4">
              <Link
                to="/dashboard"
                className="relative  hover:text-[#fab668] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 md:hover:after:w-full pt-2"
              >
                DASHBOARD
              </Link>
              <hr className="w-[18vw] border-t-1 border-white " />
              <Link
                to="/chefBot"
                className="relative  hover:text-[#fab668] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 md:hover:after:w-full"
              >
                CHEFBOT
              </Link>
              <hr className="w-[18vw] border-t-1 border-white " />
              <Link
                to="/recipe"
                className="relative  hover:text-[#fab668] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 md:hover:after:w-full"
              >
                RECIPES
              </Link>
              <hr className="w-[18vw] border-t-1 border-white " />
              <SignIn />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
