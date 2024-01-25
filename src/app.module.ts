import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserAuthModule } from './user-auth/user-auth.module';
import { TodoModule } from './todo/todo.module';
import { CollabModule } from './collab/collab.module';
import { MailerModule } from '@nestjs-modules/mailer';



@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.APP_PASSWORD,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
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
