import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from '../entity/todo.entity';
import { JwtAuthGuard } from 'src/user-auth/jwt-auth/jwt.auth.guard';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() payload: TodoEntity, @Request() req) {
    return await this.todoService.createTodo(req.user);
  }
}
