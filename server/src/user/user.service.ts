import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly tokenServerice: TokenService,
  ) {}

  async signIn(user: SignInUserDto): Promise<ResponseUserDto | HttpException> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();

    if (!foundUser) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const userDto = new UserDto(foundUser);
    const payload = { id: userDto.id, email: userDto.email };
    const tokens = this.tokenServerice.generateTokens(payload);

    return { ...tokens, user: userDto };
  }
}