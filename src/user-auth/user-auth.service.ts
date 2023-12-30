import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoEntity } from 'src/entity/todo.entity';
import { JwtService } from '@nestjs/jwt';
import { PartialUserDto } from 'src/dto/user.partialDto';

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
        
        const verifyUser = await this.userRepo.findOne({ where: { email: email } })
        if (!verifyUser) {
            throw new UnauthorizedException(`email`)
        }
        const verifyPassword = await bcrypt.compare(
          password,
          verifyUser.password,
        );
        if (!verifyPassword) {
            throw new UnauthorizedException(`password`);
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

    async getAll() {
      const users = await this.userRepo.find({ relations: ['todos'] });
      // for (let i = 0; i < users.length; i++) { 
      //   delete users[i].password
      // }

      return users.map(users => users.toResponseObject())
    }
  
  async getUser(userName: string) {
    const user = await this.userRepo.findOne({ where: { userName: userName } , relations:['todos']})
    delete user.password
    if (!user) {
      throw new HttpException(`User not Found`, HttpStatus.NOT_FOUND)
    }

    return {
      user: user,
      todos: `You have ${user.todos.length} active todos left`
    }
  }
    
}
