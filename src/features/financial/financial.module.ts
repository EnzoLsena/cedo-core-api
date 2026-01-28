import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { FinancialEntry } from './entities/financial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialEntry])],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
