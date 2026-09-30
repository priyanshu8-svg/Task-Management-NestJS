import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type Tasks = HydratedDocument<Task>;

@Schema()
export class Task {

    @Prop({ required: true })
    title: string

    @Prop()
    description: string

    @Prop({ default: false })
    completed: boolean


    @Prop({ required: true })
    userId: string
}

export const TaskSchema = SchemaFactory.createForClass(Task);