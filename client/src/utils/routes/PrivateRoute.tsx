import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  isAuth: boolean;
  redirectTo?: string;
}

const PrivateRoute = ({
  isAuth,
  redirectTo = "/",
  children,
}: PropsWithChildren<Props>) => {
  if (!isAuth) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;
