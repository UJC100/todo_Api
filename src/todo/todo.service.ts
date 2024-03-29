import { HttpException, HttpStatus, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entity/todo.entity';
import { TodoDto } from '../dto/todo.dto';
import { JwtAuthGuard } from '../user-auth/jwt-auth/jwt.auth.guard';
import { CollaboratorEntity } from 'src/entity/collaborators.entity';



@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
    @InjectRepository(CollaboratorEntity)
    private readonly collabRepo: Repository<CollaboratorEntity>,
  ) {}

  async createTodo(userId: string, payload: TodoDto) {
    try {
      const user = await this.userRepo.findOne({ where: { _id: userId } });
      delete user.password;
      const create = this.todoRepo.create({ ...payload, user: user });
      return await this.todoRepo.save(create);
    } catch {
      throw new HttpException(
        `Bad request`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getAll() {
    try {
      const todos = await this.todoRepo.find({
        relations: ['user', 'collaborators'],
      });
      const mappedTodo = todos.map((todo) => {
        return {
          ...todo,
          user: todo.user.relationshipResponseObj(),
        };
      });

      return mappedTodo;
    } catch {
      throw new HttpException(
        `Internal Server Error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTodo(id: string) {
    try {
      const todo = await this.todoRepo.findOne({
        where: { _id: id },
        relations: ['user', 'collaborators'],
      });
      delete todo.user.password;
      if (!todo) {
        throw new HttpException(`Todo Not Found`, HttpStatus.NOT_FOUND);
      }
      return todo;
    } catch {
      throw new HttpException(
        `Internal Server Error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTodo(id: string, userId: string, payload: TodoDto) {
    try {
      const checkUser = await this.userRepo.findOne({ where: { _id: userId } });
      console.log(checkUser);
      if (!checkUser) {
        throw new UnauthorizedException();
      }

      const todoId = await this.todoRepo.findOne({
        where: { _id: id },
        relations: ['user'],
      });
      if (!todoId) {
        throw new HttpException(`Todo Not Found`, HttpStatus.NOT_FOUND);
      }
      if (checkUser.userName !== todoId.user.userName) {
        throw new UnauthorizedException();
      }
      await this.todoRepo.update(id, payload);
      const updatedTodo = await this.todoRepo.findOne({
        where: { _id: id },
        relations: ['user'],
      });

      return {
        ...updatedTodo,
        user: updatedTodo.user.relationshipResponseObj(),
      };
    } catch (err) {
      throw err;
    }
  }

  async eraseTodo(id: string, userId: string) {
    try {
      const checkUser = await this.userRepo.findOne({
        where: { _id: userId },
      });
      if (!checkUser) {
        throw new UnauthorizedException();
      }

      const findTodo = await this.todoRepo.findOne({
        where: { _id: id },
        relations: ['user'],
      });
      if (checkUser.userName !== findTodo.user.userName) {
        throw new UnauthorizedException();
      }
      await this.todoRepo.delete(id);
      return {
        status: HttpStatus.OK,
        message: `Todo with id: ${id} has been deleted`,
      };
    } catch (err) {
      throw err;
    }
  }

  async addCollaborator(todoId: string, id: string) {
    const collaborator = await this.collabRepo.findOne({ where: { _id: id } });
    const todo = await this.todoRepo.findOne({
      where: { _id: todoId },
      relations: ['collaborators'],
    });

    // console.log(collaborator)
    todo.collaborators.push(collaborator);
    // todo.collaborators = [collaborator]
    const addedTodo = await this.todoRepo.save(todo);

    return addedTodo;
  } 
  
  async removeCollaborator(todoId: string, id: string) {
    const collaborator = await this.collabRepo.findOne({ where: { _id: id } });
    const todo = await this.todoRepo.findOne({
      where: { _id: todoId },
      relations: ['collaborators'],
    });

    for (let i = 0; i < todo.collaborators.length; i++){
      if (todo.collaborators[i]._id === collaborator._id) {
         todo.collaborators.splice(i, 1)
      }
    }
    
    const updatedTodo = await this.todoRepo.save(todo)

    return updatedTodo
  }

}
