import { IsNotEmpty, IsString } from "class-validator";


export class TodoDto {
    @IsNotEmpty()
    @IsString()
    todo: string
}