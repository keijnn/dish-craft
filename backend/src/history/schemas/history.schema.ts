// import * as mongoose from 'mongoose';
//
// export const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });

//import modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dish } from '@/dish/interfaces/dish.interface';

@Schema()
export class History {
  @Prop()
  userId: string;

  @Prop()
  dishes: Dish[];
}

export const HistorySchema = SchemaFactory.createForClass(History);
