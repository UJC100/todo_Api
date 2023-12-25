import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entity/todo.entity';
import { TodoDto } from '../dto/todo.dto';
import { JwtAuthGuard } from '../user-auth/jwt-auth/jwt.auth.guard';



@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
  ) {}

  
    async createTodo(userId: string, payload: TodoDto) {
      const user = await this.userRepo.findOne({where:{_id:userId}})
      delete user.password
        const create = this.todoRepo.create({ ...payload, user: user });
    return await this.todoRepo.save(create);
  }

    async getAll() {
       return await this.todoRepo.find({relations: ['user']})
  } 
  
  
}
