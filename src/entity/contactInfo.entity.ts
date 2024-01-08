import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { UserEntity } from "./user.entity";


@Entity()
export class ContactInfoEntity extends BaseEntity{
    @Column({unique:true})
    email: string

    @OneToOne(() => UserEntity, user => user.userEmail, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: UserEntity;
}