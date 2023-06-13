import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { TokenService } from './token/token.service';
import { UserRequest } from './types/user-request.interface';

@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(private readonly tokenServerice: TokenService) {}
  async use(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const accessToken = req.headers.authorization.split(' ')[1];
        const userData = this.tokenServerice.validateAccessToken(accessToken);

        if (userData) {
          req.user = userData;
          next();
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } else {
        throw new UnauthorizedException('No token found');
      }
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
