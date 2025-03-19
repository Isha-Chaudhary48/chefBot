import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <footer className="w-screen h-auto m-0 p-0 text-start mb-0 mt-10">
        <div
          className="bg-[#4d361c] h-60 grid grid-cols-3   text-white  p-14 justify-center align-bottom text-sm
        "
        >
          <div className="grid grid-rows-3 ">
            <a href="#about">About</a>
            <a href="#cookbook">CookBook</a>
            <a href="#recipes">Recipes</a>
          </div>
          <div className="grid grid-rows-3 ">
            <p className="text-lg">Contact Us</p>

            <p>XYZ Road ,Punjab ,140708</p>

            <div>
              <p>Email: ishascompany.com</p>
              <p>Phone: +1 123-454-7890</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center text-2xl">
            <a href="https://www.linkedin.com/in/isha-chaudhary-8273b1286">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/Isha-Chaudhary48/">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <FontAwesomeIcon icon={faFacebook} />
            <a href="https://x.com/ishiefisshie">
              {" "}
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
        <div className="bg-[#72562b] h-20 p-5 text-white text-center">
          <div>
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
