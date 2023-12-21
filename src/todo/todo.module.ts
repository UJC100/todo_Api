import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { TodoEntity } from 'src/entity/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TodoEntity])
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
