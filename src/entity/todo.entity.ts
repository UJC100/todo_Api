import { Column, Entity, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "./Base.entity";
import { CollaboratorEntity } from "./collaborators.entity";




@Entity()
export class TodoEntity extends BaseEntity {
  @Column()
  todo: string;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity;

  @ManyToMany(() => CollaboratorEntity, (collab) => collab.tasks)
  @JoinTable()
  collaborators: CollaboratorEntity[];
}