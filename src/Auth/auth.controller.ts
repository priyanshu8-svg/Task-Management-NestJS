import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserdto } from "./Dto/createUserDto.js";
import { AuthService } from "./auth.service.js";
import { LoginUserdto } from "./Dto/loginCreatedto.js";

@Controller('/auth')

export class AuthController {
   constructor(private readonly authservice: AuthService) { }



   @Post('register')
   async register(@Body() createUserDto: CreateUserdto) {
      return this.authservice.register(createUserDto)
   }


   @Post('login')
   async login(@Body() LoginUserDto: LoginUserdto) {
      return this.authservice.login(LoginUserDto)
   }



}



