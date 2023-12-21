import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from '../entity/todo.entity';


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }
    
    @Post()
    async create(@Body() payload: TodoEntity) {
        return await this.todoService.createTodo(payload)
    }
}
