import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";


export class LoginUserdto {

    @MinLength(6)
    @IsString()
    password: string


    @IsEmail()
    email: string



    @IsString()
    role: string


}

