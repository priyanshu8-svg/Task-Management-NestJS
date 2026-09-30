import { Task, TaskSchema } from "./Schema/tasks.schema.js";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskController } from "./tasks.controller.js";
import { TaskService } from "./tasks.service.js";


@Module({
    imports: [

        MongooseModule.forFeature([
            {
                name: Task.name,
                schema: TaskSchema
            }

        ])
    ],
    controllers: [TaskController],
    providers: [TaskService],
})

export class TaskModule { } 