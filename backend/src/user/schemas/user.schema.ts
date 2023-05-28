// import * as mongoose from 'mongoose';
//
// export const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });

//import modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
