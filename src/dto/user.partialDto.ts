import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { BaseEntity } from "src/entity/Base.entity";
import { UserEntity } from "src/entity/user.entity";



export class PartialUserDto extends BaseEntity {
    firstName: string;

    middleName: string;

    lastName: string;

    age: number;

    email: string;


    constructor(user: UserEntity) {
        super()
        this._id = user._id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt
        this.firstName = user.firstName;
        this.middleName = user.userName;
        this.lastName = user.lastName;
        this.age = user.age;
        // this.email = user.email;
    }
}