//import modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  group: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
