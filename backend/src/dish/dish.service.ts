import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from '@/dish/interfaces/dish.interface';
import { Model } from 'mongoose';

@Injectable()
export class DishService {
  constructor(@InjectModel('Dish') private readonly dishModel: Model<Dish>) {}

  async findAll(groups: string[], products: string[]): Promise<Dish[] | []> {
    if (groups.length === 0 && products.length === 0) {
      return this.dishModel.find()
    }
    let query = {}
    if (groups.length > 0 && products.length > 0) {
      query = {
        groups: { $all: groups },
        products: { $all: products },
      };
    } else if (groups.length > 0) {
      query = { groups: { $all: groups } };
    } else if (products.length > 0) {
      query = { products: { $all: products } };
    } else {
      return [];
    }

    const dishes = await this.dishModel
      .find(query)
      .sort({ rating: -1 })
      .exec();

    if (dishes.length === 0) {
      return [];
    }

    return dishes;
  }

  async findOne(_id: string): Promise<Dish> {
    const dish = await this.dishModel.findById({ _id });

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return dish;
  }

  async create(dish: Omit<Dish, '_id'>): Promise<Dish> {
    if (!dish) {
      throw new ConflictException('dish is required');
    }
    const duplicate = await this.dishModel.findOneAndUpdate(
      { title: dish.title },
      dish,
      { new: true, upsert: true }
    );

    if (duplicate) return duplicate

    const newDish = await new this.dishModel(dish);
    return newDish.save();
  }
}
