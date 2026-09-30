import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserModule } from './user/user.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module.js';
import { TaskModule } from './Tasks/tasks.module.js';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGO_URI')
      })
    }),

    UserModule,
    AuthModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService]



})
export class AppModule { }
