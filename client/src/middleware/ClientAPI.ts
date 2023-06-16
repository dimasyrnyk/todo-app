import { store } from "@store/index";
import { refreshTokens, userSignOut } from "@store/auth/actions";
import { AnyAction } from "redux";

type Config = {
  [key: string]: string | object;
};

class ClientAPI {
  static async originalRequest(url: string, config: Config) {
    const response = await fetch(url, config);
    const data = await response.json();
    return { response, data };
  }

  static async interceptedFetch(url: string, config: Config = {}) {
    const { accessToken, refreshToken } = store.getState().auth;
    let newConfig;

    if (!config) {
      newConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    } else {
      newConfig = {
        ...config,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    let { response, data } = await ClientAPI.originalRequest(url, newConfig);

    if (response.status === 401) {
      const refreshedTokens = await store.dispatch<any>(
        refreshTokens(refreshToken)
      );
      const newAuthConfig = {
        ...newConfig,
        headers: {
          ...newConfig.headers,
          Authorization: `Bearer ${refreshedTokens?.accessToken}`,
        },
      };

      const newResponse = await ClientAPI.originalRequest(url, newAuthConfig);
      response = newResponse.response;
      data = newResponse.data;
    }

    if (!response.ok) {
      data.message = "Your session is over";
      store.dispatch(userSignOut());
    }

    return { response, data };
  }
}

export default ClientAPI;
