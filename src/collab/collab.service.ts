import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollabDto } from 'src/dto/collab.dto';
import { CollaboratorEntity } from 'src/entity/collaborators.entity';
import { TodoEntity } from 'src/entity/todo.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CollabService {
  constructor(
    @InjectRepository(CollaboratorEntity)
    private readonly collabRepo: Repository<CollaboratorEntity>,
    @InjectRepository(TodoEntity)
      private readonly todoRepo: Repository<TodoEntity>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
  ) { }
    
  async createCollab(payload: CollabDto, userId: string) {
    
    const user = await this.userRepo.findOne({ where: { _id: userId } })

    const collaborator = this.collabRepo.create({...payload, user:user.toResponseObject()})
      
   return  await this.collabRepo.save(collaborator)
   
  }
  
  async getCollabs() {
    const collaborators = await this.collabRepo.find({
      relations: ['user', 'tasks'],
    });

    const mappedCollabs = collaborators.map(collabs => {
      return {
        ...collabs,
        user: collabs.user.relationshipResponseObj()
      }
    })

    return mappedCollabs
  }
}
