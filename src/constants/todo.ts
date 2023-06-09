export interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
  creationDate: string;
  expirationDate: string;
}

export const DELETE_TODOS_CONFIRM_MESSAGE =
  "Are you sure you want to delete all completed todos?";
