import { Body, Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
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
        return await this.todoService.getAll()
    }
  
  @Get(':id')
  async getTodo(@Param('id') id:string, @User('id') userId: string) {
    return await this.todoService.getTodo(id, userId)
  }
}
