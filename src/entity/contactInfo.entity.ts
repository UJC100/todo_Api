import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { UserEntity } from "./user.entity";


@Entity()
export class ContactInfoEntity extends BaseEntity{
    @Column()
    email: string

    @OneToOne(() => UserEntity, user => user.userEmail, {cascade:true})
    @JoinColumn()
    user: UserEntity;
}