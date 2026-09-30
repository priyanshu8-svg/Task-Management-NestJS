import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class UpdateUserdto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    name: String


}
