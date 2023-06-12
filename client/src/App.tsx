import { FC, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import "./App.scss";
import { AppDispatch, RootState } from "@store/index";
import { getUserTodos } from "@store/todos/actions";
import { ThemeContext } from "@context/ThemeContext";
import PrivateRoute from "@utils/routes/PrivateRoute";
import TodosList from "@pages/TodosList";
import SignIn from "@pages/SignIn";
import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";
import NavBar from "@components/NavBar/NavBar";

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getUserTodos(user.id));
    }
  }, [user]);

  return (
    <div className={theme}>
      <div className="app__container background text">
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
