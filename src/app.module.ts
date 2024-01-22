import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserAuthModule } from './user-auth/user-auth.module';
import { TodoModule } from './todo/todo.module';
import { CollabModule } from './collab/collab.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DatabaseModule,
    UserAuthModule,
    TodoModule,
    CollabModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
