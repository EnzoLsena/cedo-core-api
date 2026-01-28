import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
import { StockBatch } from './stock-batch.entity';

@Entity('stock_items')
export class StockItem extends BaseEntity {
  @Column()
  name: string;

  @Column()
  unit: string;

  @OneToMany(() => StockBatch, batch => batch.stockItem)
  batches: StockBatch[];
}
