import { Controller, Put, Param, Body, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema.js';
import { UpdateUserdto } from './dto/updateUserdto.js';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../Auth/Guards/jwtguard.js';
import { AuthUser } from '../Auth/Decorators/AuthDecorator.js';
@Controller('user')


export class UserController {


    constructor(
        private readonly userService: UserService
    ) { }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserdto,
    ) {
        return this.userService.updateUser(
            id,
            updateUserDto
        );
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOneUser(
        @Param('id') id: string,
    ) {
        return this.userService.findOne(id)
    }


    @Get()
    getMe(@AuthUser() user: any) {
        return this.userService.findById(user.sub)

    }


}
