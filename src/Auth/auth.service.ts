import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserdto } from './Dto/createUserDto.js';
import { User } from '../user/schema/user.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../user/enums/role.enums.js';
import { JwtService } from '@nestjs/jwt';
import { LoginUserdto } from './Dto/loginCreatedto.js';
@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,


        private readonly jwtservice: JwtService,
    ) { }


    async register(registerUserdto: CreateUserdto) {

        const { name, email, password } = registerUserdto;

        const existingUser = await this.userModel.findOne({ email })

        if (existingUser) {

            throw new ConflictException('Email Already Exist');
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create Password
        const user = new this.userModel({
            name,
            email,
            password: hashedPassword,
            role: Role.USER,
        });

        const savedUser = await user.save();


        const payload = ({
            sub: savedUser._id.toString(),
            email: savedUser.email,
            role: savedUser.role
        });

        const accessToken = await this.jwtservice.signAsync(payload)



        return { user: savedUser, accessToken }




    }



    async login(LoginUser: LoginUserdto) {

        const { email, password } = LoginUser;

        const user = await this.userModel.findOne({ email }).exec()

        if (!user) {
            throw new NotFoundException('Account Not Found');
        }

        // Match Password


        const MatchedPass = await bcrypt.compare(
            password,
            user.password
        )

        //Jwt Creation 

        const payload = ({
            sub: user._id.toString(),
            email: user.email,
            role: user.role
        })

        const access_token = this.jwtservice.signAsync(payload)

        Logger.log(`LoggedIn Successfully`)
        return access_token;
    }
} 