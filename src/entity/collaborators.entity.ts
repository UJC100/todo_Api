import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { TodoEntity } from "./todo.entity";
import { UserEntity } from "./user.entity";



@Entity()
export class CollaboratorEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, user => user.collaborators)
  user: UserEntity;

  @ManyToMany(() => TodoEntity, todo => todo.collaborators, {cascade: true})
  tasks: TodoEntity[];
}