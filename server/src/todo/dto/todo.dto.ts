export class TodoDto {
  id: string;
  title: string;
  isCompleted: boolean;
  creationDate: string;
  expirationDate: string;

  constructor(model: any) {
    this.id = model._id;
    this.title = model.title;
    this.isCompleted = model.isCompleted;
    this.creationDate = model.creationDate;
    this.expirationDate = model.expirationDate;
  }
}
