import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoEntity } from 'src/entity/todo.entity';
import { JwtService } from '@nestjs/jwt';
import { ContactInfoEntity } from 'src/entity/contactInfo.entity';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ContactInfoEntity)
    private readonly contactInfoRepo: Repository<ContactInfoEntity>,
    @InjectRepository(ContactInfoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: UserDto) {
    const { password, userName, email, ...rest } = payload;

    const checkUser = await this.contactInfoRepo.findOne({ where: { email } });

    try {
      if (checkUser) {
        throw new HttpException(
          `user with email already exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);

      const userContact = this.contactInfoRepo.create({ email });
      await this.contactInfoRepo.save(userContact);

      const saveUser = this.userRepo.create({
        password: hashPassword,
        userName: userName,
        userEmail: userContact,
        ...rest,
      });
      /* saveUser.userEmail = userContact  <===  ANOTHER WAY OF MAPPING CONTACTS TO USERS */
      await this.userRepo.save(saveUser);
      delete saveUser.password;
      return {
        ...saveUser,
        userEmail: saveUser.userEmail.email,
      };
    } catch (err) {
      throw err;
    }
  }

  async signIn(user: any) {
    const { email, password } = user;

    const verifyEmail = await this.contactInfoRepo.findOne({
      where: { email: email },
      relations: ['user'],
    });
    if (!verifyEmail) {
      throw new UnauthorizedException(`email`);
    }
    const verifyPassword = await bcrypt.compare(
      password,
      verifyEmail.user.password,
    );

    if (!verifyPassword) {
      throw new UnauthorizedException(`password`);
    }

    const payload = {
      sub: verifyEmail.user._id,
      email: verifyEmail.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  async getAll() {
    const users = await this.userRepo.find({
      relations: ['todos', 'userEmail'],
    });
    // for (let i = 0; i < users.length; i++) {
    //   delete users[i].password
    // }

    const mappedUserRes = users.map((users) => {
      return {
        ...users.toResponseObject(),
        userEmail: users.userEmail.email,
        todos: users.todos.map((item) => item.todo),
        todo: `You have ${users.todos.length} active todos`,
      };
    });
    return mappedUserRes;
  }

  async getUser(userName: string) {
    const user = await this.userRepo.findOne({
      where: { userName: userName },
      relations: ['todos', 'userEmail'],
    });
    delete user.password;
    if (!user) {
      throw new HttpException(`User not Found`, HttpStatus.NOT_FOUND);
    }

    return {
      ...user.relationshipResponseObj(),
      userEmail: user.userEmail.email,
      todos: user.todos.map((item) => item.todo),
      todo: `You have ${user.todos.length} active todos`,
    };
  }
}
