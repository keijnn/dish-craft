import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish } from '@/dish/interfaces/dish.interface';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('History')
    private readonly historyModel: Model<{ userId: string; dishes: Dish[] }>,
  ) {}

  async findAll(
    userId: string,
  ): Promise<{ userId: string; dishes: Dish[] } | []> {
    const history = await this.historyModel.findOne({ userId });
    if (!history) return [];
    return history;
  }

  async update(
    userId: string,
    dish: Dish,
  ): Promise<{ userId: string; dishes: Dish[] } | null> {
    const history = await this.historyModel.findOne({ userId });

    if (!history) {
      const newHistory = new this.historyModel({
        userId,
        dishes: [dish],
      });
      return newHistory.save();
    }

    const duplicate = history.dishes.find(d => d._id === dish._id);

    if (duplicate) {
      const newDishes = history.dishes.filter(d => d._id !== duplicate._id);
      newDishes.unshift(dish);
      history.dishes = newDishes;
    }

    if (!duplicate) {
      history.dishes = [...history.dishes, dish]

    }

    return history.save();
  }
}
