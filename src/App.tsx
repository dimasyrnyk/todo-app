import { FC, useContext } from "react";

import "./App.scss";
import Header from "./containers/Header/Header";
import Main from "./containers/Main/Main";
import Footer from "./containers/Footer/Footer";
import { ThemeContext } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

const App: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <div className="app__container background text">
        <ThemeSwitcher />
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

export default App;
