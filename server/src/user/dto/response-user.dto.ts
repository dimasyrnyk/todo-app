import { UserDto } from './user.dto';

export class ResponseUserDto {
  accessToken: string;
  user: UserDto;
}
