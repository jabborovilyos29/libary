import { Outlet } from "react-router-dom";
import { Header } from "../shared/ui";
import { ThemeConetext } from "../shared/ui/ThemeProvider/ThemeProvider";
import { useContext } from "react";
import styles from "./App.module.css";

function App() {
  const themeContext = useContext(ThemeConetext);
  return (
    <>
      <Header />
      <section
        className={
          themeContext?.theme === "light" ? styles.root_light : styles.root_dark
        }
      >
        <Outlet />
      </section>
    </>
  );
}

export default App;
