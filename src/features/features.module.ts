import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { RecipeModule } from './recipe/recipe.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    AuthModule,
    CustomersModule,
    ProductModule,
    RecipeModule,
    CategoryModule,
  ],
})
export class FeaturesModule {}
