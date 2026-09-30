import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Logger } from "@nestjs/common";
import { TaskService } from "./tasks.service.js";
import { CreateTaskDto } from "./dto/create-task.js";
import { AuthUser } from "../Auth/Decorators/AuthDecorator.js";
import { UpdateTaskDto } from "./dto/update-task-dto.js";
import { Roles } from "../common/decorators/roles.decorator.js";
import { RolesGuard } from "../common/guards/role.guard.js";
import { JwtAuthGuard } from "../Auth/Guards/jwtguard.js";
import { Role } from "../user/enums/role.enums.js";


@Controller('/tasks')

export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post('/createTask')
    @UseGuards(JwtAuthGuard)
    createTask(@AuthUser() user: any, @Body() createTaskDto: CreateTaskDto) {


        return this.taskService.createTask(
            user.sub,
            createTaskDto
        )
    }


    @Get('/getAllTasks')
    @UseGuards(JwtAuthGuard)
    getAllTask(@AuthUser() user: any) {
        return this.taskService.getMyTask(user.sub)
    }


    @Get('/singletask/:id')
    @UseGuards(JwtAuthGuard)
    findOneTask(@AuthUser() user: any,
        @Param('id') TaskId: string) {
        return this.taskService.findOne(
            TaskId,
            user.sub)
    }

    @Patch('updatetask/:id')
    @UseGuards(JwtAuthGuard)
    update(

        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @AuthUser() user: any,
    ) {
        return this.taskService.update(
            id,
            user.sub,
            updateTaskDto,
        );
    }


    @Delete('delete/:id')

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    remove(
        @Param('id') id: string,
        @AuthUser() user: any,
    ) {
        return this.taskService.remove(
            id
        );
    }
}

