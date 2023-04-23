import { RiMoonClearLine } from "react-icons/ri";
import { BsSun } from "react-icons/bs";
import { logo } from "../assets";

function Hero({ darkMode, handleDarkMode }) {
  return (
    <header className="w-full flex items-center justify-center flex-col">
      <nav className="flex items-center justify-between flex-row w-full mb-10 pt-3 max-w-6xl">
        <div className="h-10 div_logo w-[100px] sm:w-[130px]">
          <img
            src={logo}
            alt="logo"
            className={`w-[250px] h-[40px] object-cover rounded-full ${
              darkMode && "invert"
            }`}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className={darkMode ? "white-btn" : "black_btn"}
            onClick={() => window.open("https://github.com/negru-ioan")}
          >
            Github
          </button>
          <button
            type="button"
            className={darkMode ? "white-btn" : "black_btn"}
            onClick={handleDarkMode}
          >
            {darkMode ? <BsSun /> : <RiMoonClearLine />}
          </button>
        </div>
      </nav>

      <h1 className={`head_text ${darkMode && "text-white"}`}>
        Rezumă Articole cu <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className={`desc ${darkMode ? "text-white" : "text-gray-600"}`}>
        Aflați conținutul articolului în doar câteva secunde.
      </h2>
    </header>
  );
}

export default Hero;
