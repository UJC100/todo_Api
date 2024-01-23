import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { TodoEntity } from 'src/entity/todo.entity';
import { JwtSrategy } from '../user-auth/jwt-auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { CollaboratorEntity } from 'src/entity/collaborators.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TodoEntity, CollaboratorEntity]),
     PassportModule
  ],
  controllers: [TodoController],
  providers: [TodoService, JwtSrategy]
})
export class TodoModule {}
