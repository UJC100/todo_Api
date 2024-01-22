import { IsNotEmpty, IsString } from "class-validator";

export class CollabDto{

    @IsNotEmpty()
    @IsString()
    name: string;
}