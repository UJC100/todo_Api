import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { TodoEntity } from 'src/entity/todo.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtSrategy } from './jwt-auth/jwt.strategy';
import { ContactInfoEntity } from 'src/entity/contactInfo.entity';
import { CollaboratorEntity } from 'src/entity/collaborators.entity';
import { GoogleStrategy } from './googleStrategy/googleStrategy';
import { GoogleController } from './google.controller';
import { GoogleEntity } from 'src/entity/google.userInfo';
// import { GoogleService } from './google.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow('JWT_ENCODE'),
        signOptions: {
          algorithm: configService.getOrThrow('JWT_ALGORITHM'),
          expiresIn: configService.getOrThrow('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      TodoEntity,
      ContactInfoEntity,
      CollaboratorEntity,
      GoogleEntity
    ]),
    PassportModule,
  ],
  controllers: [UserAuthController, GoogleController],
  providers: [UserAuthService, JwtSrategy, GoogleStrategy],
  exports: [JwtSrategy, UserAuthService],
})
export class UserAuthModule {}
