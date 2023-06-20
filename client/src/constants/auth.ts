export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export enum ModalMessage {
  REMOVE_ALL_COMPLETED = "Are you sure you want to delete all completed todos?",
}

export const USER_PICTURE =
  "https://cdn-icons-png.flaticon.com/512/3364/3364044.png";
