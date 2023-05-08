import { FC, PropsWithChildren, createContext, useState } from "react";
import { Themes } from "../types/app";

type ContextTypes = {
  theme: string;
  setTheme?: (theme: string) => void;
};

export const ThemeContext = createContext<ContextTypes>({
  theme: Themes.Light,
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<string>(Themes.Light);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
