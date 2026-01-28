import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
import { StockItem } from './stock-item.entity';

@Entity('stock_batches')
export class StockBatch extends BaseEntity {
  @ManyToOne(() => StockItem)
  stockItem: StockItem;

  @Column('decimal')
  quantity: number;

  @Column()
  expirationDate: Date;
}
