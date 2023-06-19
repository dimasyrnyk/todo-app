import { ResponseTokenDto } from 'src/token/dto/response-token.dto';
import { UserDto } from './user.dto';

export class ResponseUserDto extends ResponseTokenDto {
  user: UserDto;
}
