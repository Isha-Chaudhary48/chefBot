import chefIcon from "../assets/chefIcon.png";

export default function Navbar() {
  return (
    <>
      <div className="flex   h-20 w-full bg-white text-black font-serif  rounded-bl-sm font-normal shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.05),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.8)]">
        <div className="flex  justify-start items-center text-justify   ml-3 p-2 text-2xl h-20 w-full">
          <img className="w-10 h-10 mr-2" src={chefIcon} alt="" />
          <span>Chef Table</span>
        </div>

        <div className="flex justify-end  items-center  gap-8 h-20 w-full pr-20">
          <a
            href="#about"
            className="relative text-gray-600 hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </a>
          <a
            href="#recipe"
            className="relative text-gray-600 hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
          >
            Recipes
          </a>
          <a
            href="#cookBook"
            className="relative text-gray-600 hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
          >
            Cookbooks
          </a>
          <a
            href="#contact"
            className="relative text-gray-600 hover:text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#4d361c] after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
