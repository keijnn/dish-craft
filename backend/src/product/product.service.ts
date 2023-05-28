import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async create(product: { title: string; group: string }): Promise<Product> {
    if (!product) {
      throw new ConflictException('Product is required');
    }

    const duplicate = await this.productModel.findOne({ title: product.title });

    if (duplicate) {
      throw new ConflictException('This name already used');
    }

    const newProduct = await new this.productModel(product);
    return newProduct.save();
  }
}
