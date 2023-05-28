import { Body, Controller, Get, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Dish } from '@/dish/interfaces/dish.interface';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('all')
  findAll(
    @Body() { userId }: { userId: string },
  ): Promise<{ userId: string; dishes: Dish[] } | []> {
    return this.historyService.findAll(userId);
  }

  @Post()
  update(
    @Body() { userId, dish }: { userId: string; dish: Dish },
  ): Promise<{ userId: string; dishes: Dish[] } | null> {
    return this.historyService.update(userId, dish);
  }
}
