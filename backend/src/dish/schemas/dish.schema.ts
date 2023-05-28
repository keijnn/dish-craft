//import modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Dish {
  @Prop()
  title: string;
  @Prop()
  img: string;
  @Prop()
  ingredients: { ingredient: string; proportion: string }[];
  @Prop()
  recipe: string;
  @Prop()
  groups: string[];
  @Prop()
  rating: number;
  @Prop()
  products: string[];
}

export const DishSchema = SchemaFactory.createForClass(Dish);
