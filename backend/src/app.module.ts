//import Nest modules
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//import app modules
import { DishModule } from './dish/dish.module';
import { ProductModule } from './product/product.module';
import { HistoryModule } from './history/history.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DishModule,
    ProductModule,
    HistoryModule,
    MongooseModule.forRoot(
      'mongodb+srv://helltaker:9dZ1nqFh2t7zgEOu@clover-dynamics.3whxzdj.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
