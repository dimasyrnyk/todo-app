import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Token } from './schemas/token-schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private readonly jwtService: JwtService,
  ) {}

  generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const findedToken = await this.tokenModel.findOne({ userId });
    if (findedToken) {
      findedToken.refreshToken = refreshToken;
      return findedToken.save();
    }

    const token = await this.tokenModel.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const token = await this.tokenModel.deleteOne({ refreshToken });
    return token;
  }

  async getToken(refreshToken) {
    const token = await this.tokenModel.findOne({ refreshToken });
    return token;
  }
}
