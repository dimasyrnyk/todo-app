export class CreateTodoDto {
  title: string;
  isCompleted: boolean;
  creationDate: string;
  expirationDate: string;
  readonly creator: string;
}
