import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServerice: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(
    @Res() response,
    @Body() user: SignInUserDto,
  ): Promise<ResponseUserDto> {
    const userData = await this.userServerice.signIn(user);
    return response.json(userData);
  }
}
