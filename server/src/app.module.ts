import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../..', 'client', 'build'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
  ],
  providers: [],
})
export class AppModule {}
