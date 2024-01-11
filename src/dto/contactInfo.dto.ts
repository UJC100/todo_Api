import { IsNotEmpty, IsString } from "class-validator";

export class ContactInfoDto {
  @IsNotEmpty()
  @IsString()
  email: string;

}