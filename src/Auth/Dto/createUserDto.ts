import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserdto {


  @IsNotEmpty()
  @IsEmail()

  email: string;


  @IsNotEmpty()
  @IsString()
  name: string;


  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;


}