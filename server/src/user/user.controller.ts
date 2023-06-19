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
import { ResponseTokenDto } from 'src/token/dto/response-token.dto';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServerice: UserService) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Res() response,
    @Body() user: SignInUserDto,
  ): Promise<ResponseUserDto> {
    const userData = await this.userServerice.signIn(user);
    return response.json(userData);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Res() response,
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ResponseTokenDto> {
    const tokens = await this.userServerice.refresh(refreshTokenDto.token);
    return response.json(tokens);
  }
}
