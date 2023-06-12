export interface ITodo {
  _id: string;
  title: string;
  isCompleted: boolean;
  creationDate: string;
  expirationDate: string;
  creator: string;
}

export interface ITodoDto {
  title: string;
  isCompleted: boolean;
  creationDate: string;
  expirationDate: string;
  creator: string;
}

export const DELETE_TODOS_CONFIRM_MESSAGE =
  "Are you sure you want to delete all completed todos?";
