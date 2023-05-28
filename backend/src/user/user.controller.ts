import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { User } from '@/user/interfaces/user.interface';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() { name }: { name: string }): Promise<User> {
    return this.userService.create(name);
  }
}
