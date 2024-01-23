import { Body, Controller, Post, UseGuards, Req, Get, Param, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from '../entity/todo.entity';
import { JwtAuthGuard } from 'src/user-auth/jwt-auth/jwt.auth.guard';
import { User } from 'src/todo/user.decorator';
import { UserDto } from 'src/dto/user.dto';
import { TodoDto } from 'src/dto/todo.dto';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User('id') userId: any, @Body() payload: TodoDto, @Req() req) {
    //   const userId = req.user.id
    //   console.log(user)
    return await this.todoService.createTodo(userId, payload);
  }

  @Get()
  async getAll() {
    return await this.todoService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTodo(@Param('id') id: string) {
    return await this.todoService.getTodo(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(
    @Param('id') id: string,
    @Body() payload: TodoDto,
    @User('id') userId: string,
  ) {
    return await this.todoService.updateTodo(id, userId, payload);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Param('id') id: string, @User('id') userId: string) {
    return await this.todoService.eraseTodo(id, userId);
  }

  @Post(':todoId/collabs/:id')
  @UseGuards(JwtAuthGuard)
  async addCollaborators(@Param('todoId') todoId: string, @Param('id') id: string,) {
    return await this.todoService.addCollaborator(todoId, id)
  }

  @Post(':todoId/removecollabs/:id')
  @UseGuards(JwtAuthGuard)
  async removeCollaborators(@Param('todoId') todoId: string, @Param('id') id: string,) {
    return await this.todoService.removeCollaborator(todoId, id)
  }
}
