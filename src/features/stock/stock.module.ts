import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockItem } from './entities/stock-item.entity';
import { StockBatch } from './entities/stock-batch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StockItem, StockBatch])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
