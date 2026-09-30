import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema.js';
import { Model } from 'mongoose';
import { UpdateUserdto } from './dto/updateUserdto.js';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }


    async updateUser(id: string, updateUserDto: UpdateUserdto) {

        const user = await this.userModel
            .findByIdAndUpdate(
                id,
                updateUserDto,
                {
                    new: true,
                    runValidators: true,
                },
            )
            .exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;

    }





    async findOne(id: string) {
        const user = await this.userModel
            .findById(id)
            .select('-password')
            .exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }


    async findById(userId: string) {
        const user = await this.userModel.findById(userId).select('-password').exec()
    }
}
