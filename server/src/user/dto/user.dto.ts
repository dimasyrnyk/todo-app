export class UserDto {
  id: string;
  email: string;
  name: string;
  picture: string;

  constructor(model: any) {
    this.id = model._id;
    this.email = model.email;
    this.name = model.name;
    this.picture = model.picture;
  }
}
