import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
//   @MinLength(6)
//   @MaxLength(16)
//   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[^\da-zA]).{8,}$/, {
//     message:
//       'password must contain atleast One Uppercase, One number, and One special key',
//   })
  password: string;
}