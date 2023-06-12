import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../..', 'client', 'build'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    UserModule,
    TodoModule,
  ],
  providers: [],
})
export class AppModule {}
