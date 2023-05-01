import { FC } from "react";

import "./App.scss";
import Header from "./containers/Header/Header";
import Main from "./containers/Main/Main";
import Footer from "./containers/Footer/Footer";

const App: FC = () => {
  return (
    <div className="App__container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
