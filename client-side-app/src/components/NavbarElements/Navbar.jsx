import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import chefIcon from "../../assets/chefIcon.png";
import { SignIn } from "./SignIn";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex h-20 w-[100vw] bg-white text-black font-serif  rounded-bl-sm font-normal shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.05),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.8)] mb-20 ">
        <div className=" flex  justify-start items-center text-justify   ml-3 p-2 text-2xl h-20 w-full">
          <img className="w-10 h-10 mr-2" src={chefIcon} alt="" />
          <span>Chef Table</span>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <X size={24} className="z-50 bg-black" />
          ) : (
            <Menu size={24} className="mr-[145px]" />
          )}
        </button>
        <div className=" hidden md:flex justify-end  items-center  gap-2  sm:gap-8 h-20 w-full sm:pr-20">
          <Link
            to="/dashboard"
            className="relative text-black hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
          >
            Dashboard
          </Link>
          <Link
            to="/chefBot"
            className="relative text-gray-600 hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
          >
            ChefBot
          </Link>
          <Link
            to="/recipe"
            className="relative text-gray-700 hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
          >
            Recipes
          </Link>

          <SignIn />
        </div>
        {isOpen && (
          <div className=" top-0 absolute right-0 h-auto w-[20%] bg-[#4d361c] text-white shadow-lg flex flex-col items-center justify-center gap-8 z-40 md:hidden pt-10 pb-10    ">
            <Link
              to="/dashboard"
              className="relative  hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
            >
              Dashboard
            </Link>
            <Link
              to="/chefBot"
              className="relative  hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
            >
              ChefBot
            </Link>
            <Link
              to="/recipe"
              className="relative  hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
            >
              Recipes
            </Link>
            <SignIn />
          </div>
        )}
      </div>
    </>
  );
}
