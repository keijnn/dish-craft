import { Body, Controller, Post } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from '@/dish/interfaces/dish.interface';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('all')
  findAll(
    @Body() { groups, products }: { groups: string[]; products: string[] },
  ): Promise<Dish[] | []> {
    return this.dishService.findAll(groups, products);
  }

  @Post('one')
  findOne(@Body() { _id }: { _id: string }): Promise<Dish> {
    return this.dishService.findOne(_id);
  }

  @Post('create')
  create(@Body() dish: Omit<Dish, '_id'>): Promise<Dish> {
    return this.dishService.create(dish);
  }
}
