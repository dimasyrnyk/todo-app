import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { AppRoutes } from "@constants/app";

interface Props {
  isAuth: boolean;
  redirectTo?: string;
}

const PrivateRoute = ({
  isAuth,
  redirectTo = AppRoutes.HOME,
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
