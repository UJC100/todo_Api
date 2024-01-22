import { Module } from '@nestjs/common';
import { CollabController } from './collab.controller';
import { CollabService } from './collab.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorEntity } from 'src/entity/collaborators.entity';
import { TodoEntity } from 'src/entity/todo.entity';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollaboratorEntity, TodoEntity, UserEntity])
  ],
  controllers: [CollabController],
  providers: [CollabService]
})
export class CollabModule {}
