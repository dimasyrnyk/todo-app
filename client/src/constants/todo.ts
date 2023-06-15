export interface ITodo {
  title: string;
  isCompleted: boolean;
  creationDate: string;
  expirationDate: string;
}

export interface ICreateTodoDto extends ITodo {
  creator: string;
}

export interface ITodoDto extends ITodo {
  id: string;
}

export const DELETE_TODOS_CONFIRM_MESSAGE =
  "Are you sure you want to delete all completed todos?";
