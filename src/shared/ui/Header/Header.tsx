import { NavLink } from "react-router-dom";
import { ChangeEvent, useContext } from "react";
import { ThemeConetext } from "../ThemeProvider/ThemeProvider";
import { ITheme } from "../../models";
import { headerStyles } from "./themeStyles";
import styles from "./Header.module.css";

export default function Header() {
  const themeContext = useContext(ThemeConetext);

  const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    themeContext?.setTheme(event.target.value as ITheme);
  };

  return (
    <header className={headerStyles[themeContext!.theme].header}>
      <nav className={headerStyles[themeContext!.theme].headerNav}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? headerStyles[themeContext!.theme].active
              : headerStyles[themeContext!.theme].inActive
          }
          to={"/form"}
        >
          form
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? headerStyles[themeContext!.theme].active
              : headerStyles[themeContext!.theme].inActive
          }
          to={"/chat"}
        >
          chat
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? headerStyles[themeContext!.theme].active
              : headerStyles[themeContext!.theme].inActive
          }
          to={"/table"}
        >
          table
        </NavLink>
      </nav>
      <label className={styles.label}>
        Choose a theme:{" "}
        <select
          className={styles.select}
          defaultValue={"light"}
          onChange={(event) => handleChangeTheme(event)}
        >
          <option value={"light"}>light</option>
          <option value={"dark"}>dark</option>
        </select>
      </label>
    </header>
  );
}
