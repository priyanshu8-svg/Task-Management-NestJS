import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./Schema/tasks.schema.js";
import { Model, Types } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.js";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthUser } from "../Auth/Decorators/AuthDecorator.js";
import { UpdateTaskDto } from "./dto/update-task-dto.js";
@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name)
    private readonly taskModel: Model<Task>) { }

    async createTask(userId: string, createTaskDto: CreateTaskDto) {

        const { title, description, completed } = createTaskDto

        const newTask = new this.taskModel({ ...createTaskDto, userId })
        const savedTask = newTask.save();

        return savedTask;
    }


    async getMyTask(userId: string) {

        const MyTasks = this.taskModel.find({ userId }).exec();

        return MyTasks;
    }

    async findOne(
        taskId: string,
        userId: string,
    ) {
        const task = await this.taskModel
            .findOne({
                _id: taskId,
                userId,
            })
            .exec();

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    async update(
        taskId: string,
        userId: string,
        updateTaskDto: UpdateTaskDto,
    ) {
        const task = await this.taskModel
            .findOneAndUpdate(
                {
                    _id: taskId,
                    userId,
                },
                updateTaskDto,
                {
                    new: true,
                    runValidators: true,
                },
            )
            .exec();

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }



    async remove(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid task ID');
        }

        const task = await this.taskModel.findById(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        await this.taskModel.findByIdAndDelete(id);

        return {
            message: 'Task deleted successfully',
        };
    }


}