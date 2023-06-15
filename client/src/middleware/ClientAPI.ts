import { store } from "@store/index";

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
    const token = store.getState().auth.token;
    let newConfig;

    if (!config) {
      newConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      newConfig = {
        ...config,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }

    let { response, data } = await ClientAPI.originalRequest(url, newConfig);

    return { response, data };
  }
}

export default ClientAPI;
