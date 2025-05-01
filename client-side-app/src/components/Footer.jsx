import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { SignIn } from "./NavbarElements/SignIn";
export default function Footer() {
  return (
    <>
      <footer
        id="footer"
        className="contact w-screen h-[400px]   p-0 text-start mb-0 mt-16 font-sans grid grid-rows-2"
      >
        <div
          className="bg-[#825d3f]  grid grid-cols-3  text-white  p-8 sm:p-12 justify-center align-bottom text-sm
        "
        >
          <div className="grid grid-rows-4 text-sm sm:text-lg   ">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/chefBot">ChefBot</Link>
            <Link to="/recipe">Recipes</Link>
          </div>
          <div className="grid grid-rows-2 sm:grid-rows-3">
            <p className="text-lg">Contact Us</p>

            <p>XYZ Road ,Punjab ,140708</p>

            <div>
              <p>Email: ishascompany.com</p>
              <p>Phone: +1 123-454-7890</p>
            </div>
          </div>
          <div className="grid grid-rows-4 ml-16 grid-cols-1 items-center text-lg sm:text-2xl sm:grid-cols-4 ">
            <a href="https://www.linkedin.com/in/isha-chaudhary-8273b1286">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/Isha-Chaudhary48/">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <FontAwesomeIcon icon={faFacebook} />
            <a href="https://x.com/ishiefisshie">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
        <div className="bg-[#583f2b]  pl-5 pr-5 pt-5 flex justify-center items-center  text-white text-center">
          <div>
            <p className="mb-8">
              From our kitchen to yours {"-"}happy cooking!
            </p>
            <p className="pb-1 text-sm">
              &copy; 2025 Isha's company | <a href="/privacy">Privacy Policy</a>{" "}
              | <a href="/terms">Terms of Service</a>
            </p>
            <p className="text-sm"> Made by Isha with {"<3"}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
