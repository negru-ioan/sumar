import Hero from "./components/Hero";
import Demo from "./components/Demo";
import "./App.css";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className={`app ${darkMode && "app_dark_bg"}`}>
        <Hero darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Demo darkMode={darkMode} />
      </div>
    </main>
  );
}

export default App;