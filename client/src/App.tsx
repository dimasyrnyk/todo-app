import { FC, useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import "./App.scss";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getUserTodos } from "@store/todos/ActionCreators";
import { ThemeContext } from "@context/ThemeContext";
import PrivateRoute from "@utils/routes/PrivateRoute";
import TodosList from "@pages/TodosList";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import NavBar from "@components/NavBar/NavBar";
import Alert from "@components/Alert/Alert";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserTodos());
    }
  }, [isAuth]);

  return (
    <div className={theme}>
      <div className="app__container background text">
        <Alert />
        <NavBar />
        {pathname === "/" && <Header />}
        <main className="main__container">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute
                  isAuth={isAuth}
                  redirectTo="/signin"
                >
                  <TodosList />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRoute isAuth={!isAuth}>
                  <SignUp />
                </PrivateRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PrivateRoute isAuth={!isAuth}>
                  <SignIn />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
