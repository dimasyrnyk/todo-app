import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/user/schemas/user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  isCompleted: boolean;

  @Prop({ required: true })
  creationDate: string;

  @Prop({ required: true })
  expirationDate: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
