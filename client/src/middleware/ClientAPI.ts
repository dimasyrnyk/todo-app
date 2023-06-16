import { store } from "@store/index";
import { refreshTokens, userSignOut } from "@store/auth/actions";
import { AlertMessage } from "@constants/app";

type Config = {
  [key: string]: string | object;
};

type Headers = { [key: string]: string };

class ClientAPI {
  static async originalRequest(url: string, config: Config) {
    const response = await fetch(url, config);
    const data = await response.json();
    return { response, data };
  }

  static getNewConfig(config: Config, accessToken: string) {
    const isGetMethod = () => !Object.keys(config).length;
    let headers: Headers = { Authorization: `Bearer ${accessToken}` };

    if (!isGetMethod()) {
      headers = { "Content-Type": "application/json", ...headers };
    }
    return { ...config, headers };
  }

  static async interceptedFetch(url: string, config: Config = {}) {
    const { accessToken, refreshToken } = store.getState().auth;

    const newConfig = ClientAPI.getNewConfig(config, accessToken);

    let { response, data } = await ClientAPI.originalRequest(url, newConfig);

    if (response.status === 401) {
      const newTokens = await store.dispatch<any>(refreshTokens(refreshToken));

      if (newTokens) {
        const newAuthConfig = ClientAPI.getNewConfig(
          config,
          newTokens?.accessToken
        );
        const newResponse = await ClientAPI.originalRequest(url, newAuthConfig);

        response = newResponse.response;
        data = newResponse.data;
      } else {
        store.dispatch(userSignOut());
        data.message = AlertMessage.SESSIOIN_IS_OVER;
      }
    }

    return { response, data };
  }
}

export default ClientAPI;
