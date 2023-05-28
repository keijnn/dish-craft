import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@/user/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async create(name: string): Promise<User> {
    if (!name) {
      throw new ConflictException('Name is required');
    }

    const duplicate = await this.userModel.findOne({ name });

    if (duplicate) {
      return duplicate
    }

    const user = await new this.userModel({ name });
    return user.save();
  }

  async findOne(name: string): Promise<User> {
    const user = await this.userModel.findOne({ name });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
