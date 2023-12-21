import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "./Base.entity";



@Entity()
export class TodoEntity extends BaseEntity{

    @Column()
    todo: string

    @ManyToOne(() => UserEntity, (user) => user.todos)
    user: UserEntity
}