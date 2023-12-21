import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoEntity } from 'src/entity/todo.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }
    

    async signUp(payload: UserDto) {
        const { password, email, ...rest } = payload
        try {
             const checkUser = await this.userRepo.findOne({
               where: { email },
             });
             if (checkUser) {
               throw new HttpException(
                 `user with email already exist`,
                 HttpStatus.BAD_REQUEST,
               );
             }
             const saltOrRounds = 10;
             const hashPassword = await bcrypt.hash(password, saltOrRounds);

             const saveUser = await this.userRepo.save({
               password: hashPassword,
               email,
               ...rest,
             });
             delete saveUser.password;

             return saveUser;
        } catch {
            throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
       
    }

    async signIn(user: any) {
        const { email, password } = user
        
        const verifyUser = await this.userRepo.findOne({ where: { email } })
        if (!verifyUser) {
            throw new UnauthorizedException()
        }
        const verifyPassword = await bcrypt.compare(verifyUser.password, password)
        if (!verifyPassword) {
            throw new UnauthorizedException()
        }

        const payload = {
            sub: verifyUser._id,
            email: verifyUser.email
        }

        const token = await this.jwtService.signAsync(payload)

        return {
            token
        }
    }
}
