import { createContext, useState } from "react";
import { ContainerProps, ContextType, ITheme } from "../../models";

export const ThemeConetext = createContext<ContextType | null>(null);

export default function ThemeProvider(props: ContainerProps) {
  const [theme, setTheme] = useState<ITheme>("light");

  const handleChangeTheme = (theme: ITheme) => {
    setTheme(theme);
  };

  const values = { theme: theme, setTheme: handleChangeTheme };

  return (
    <ThemeConetext.Provider value={values}>
      {props.children}
    </ThemeConetext.Provider>
  );
}
