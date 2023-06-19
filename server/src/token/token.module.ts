import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token-schema';

@Module({
  providers: [TokenService],
  exports: [TokenService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({ global: true }),
  ],
})
export class TokenModule {}
