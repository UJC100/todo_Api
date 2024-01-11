import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Roles } from "src/enum/role";
import { BaseEntity } from "./Base.entity";
import { TodoEntity } from "./todo.entity";
import { ContactInfoEntity } from "./contactInfo.entity";



@Entity()
export class UserEntity extends BaseEntity {
    @Column()
    firstName: string;
    
    @Column()
    userName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    age: number;
    
    @Column()
    password: string;
    
    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.user
    })
    role: Roles;

    @OneToMany(() => TodoEntity, (todo) => todo.user)
    todos: TodoEntity[];

    @OneToOne(() => ContactInfoEntity, contactInfo => contactInfo.user)
    userEmail: ContactInfoEntity;

    @ManyToMany(() => TodoEntity, {cascade: true})
    @JoinTable()
    bookmarks: TodoEntity[];

    toResponseObject() {
        const { password, role, ...rest } = this;
        return rest
    };

    relationshipResponseObj() {
        const { password, role, createdAt, updatedAt, age, ...rest } = this;
        return rest;
    }
}

