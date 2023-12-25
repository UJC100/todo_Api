import { Roles } from "src/enum/role";
import { BaseEntity } from "./Base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { TodoEntity } from "./todo.entity";



@Entity()
export class UserEntity extends BaseEntity {
    @Column()
    firstName: string;
    
    @Column({nullable:true})
    middleName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    age: number;
    
    @Column({unique:true})
    email: string;
    
    @Column()
    password: string; 
    
    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.user
    })
    role: Roles;

    @OneToMany(() => TodoEntity, (todo) => todo.user)
    todos: TodoEntity[]
}