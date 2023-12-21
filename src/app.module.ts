import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserAuthModule } from './user-auth/user-auth.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DatabaseModule,
    UserAuthModule,
    TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
