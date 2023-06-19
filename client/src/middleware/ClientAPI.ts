import { store } from "@store/index";
import { ITokens } from "@store/types/auth";
import { authRefreshTokens } from "@store/auth/ActionCreators";
import { authSignOut } from "@store/auth/AuthSlice";
import { AlertMessage } from "@constants/app";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const clientApi: AxiosInstance = axios.create();

clientApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = store.getState().auth as ITokens;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

clientApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      const { refreshToken } = store.getState().auth as ITokens;

      try {
        const newTokens = await store.dispatch<any>(
          authRefreshTokens(refreshToken)
        );

        if (newTokens.payload.accessToken && originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.payload.accessToken}`;

          return clientApi(originalRequest);
        } else {
          if (error.response && error.response.data) {
            const errorData = error.response.data as { message: string };
            errorData.message = AlertMessage.SESSIOIN_IS_OVER;
          }
          store.dispatch(authSignOut());
        }
      } catch (err) {}
    }

    throw error;
  }
);

export default clientApi;
