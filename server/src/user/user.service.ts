import {
  Injectable,
  HttpException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { TokenService } from 'src/token/token.service';
import { ResponseTokenDto } from 'src/token/dto/response-token.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(user: SignInUserDto): Promise<ResponseUserDto | HttpException> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();

    if (!foundUser) {
      throw new BadRequestException('Incorrect username or password');
    }

    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (!isMatch) {
      throw new BadRequestException('Incorrect username or password');
    }

    const userDto = new UserDto(foundUser);
    const payload = { id: userDto.id, email: userDto.email };
    const tokens = this.tokenService.generateTokens(payload);

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async refresh(refreshToken): Promise<ResponseTokenDto> {
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token has been expired');
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.getToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new ForbiddenException('Refresh token has been expired');
    }

    const payload = { id: userData.id, email: userData.email };
    const tokens = this.tokenService.generateTokens(payload);

    await this.tokenService.saveToken(userData.id, tokens.refreshToken);

    return { ...tokens };
  }
}
