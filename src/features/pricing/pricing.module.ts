import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { PricingAnalysis } from './entities/pricing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PricingAnalysis])],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
