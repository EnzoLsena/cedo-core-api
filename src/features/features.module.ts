import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { RecipeModule } from './recipe/recipe.module';
import { StockModule } from './stock/stock.module';
import { FinancialModule } from './financial/financial.module';
import { PricingModule } from './pricing/pricing.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    AuthModule,
    CustomersModule,
    ProductModule,
    RecipeModule,
    StockModule,
    FinancialModule,
    PricingModule,
  ],
})
export class FeaturesModule {}
