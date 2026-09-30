import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enums/role.enums.js";


export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    name: string


    @Prop({
        required: true,
        unique: true
    })
    email: string

    @Prop({ reuired: true })
    password: string

    @Prop({ default: Role.USER })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User)