import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  exports: [TokenService],
  imports: [JwtModule.register({ global: true })],
})
export class TokenModule {}
