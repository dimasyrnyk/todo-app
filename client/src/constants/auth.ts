export const GOOGLE_OAUTH_URL =
  "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export enum ModalMessage {
  REMOVE_ALL_COMPLETED = "Are you sure you want to delete all completed todos?",
}
