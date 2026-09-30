import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema.js';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './Strategies/jwtStrategy.js';
@Module({
    imports: [

        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),

        ConfigModule,

        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],


            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('JWT_SECRET'),

                signOptions: {
                    expiresIn: '1h'
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,
        JwtStrategy
    ]
})
export class AuthModule { }
