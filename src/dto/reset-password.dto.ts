import { IsNotEmpty } from "class-validator"

export class ResetPasswordDto {
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    confirmPassword: string;
}