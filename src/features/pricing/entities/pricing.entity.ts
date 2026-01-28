import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
import { Product } from 'src/features/product/entities/product.entity'; 

@Entity('pricing_analysis')
export class PricingAnalysis extends BaseEntity {
  @ManyToOne(() => Product)
  product: Product;

  @Column('decimal')
  totalCost: number;

  @Column('decimal')
  suggestedPrice: number;

  @Column('decimal')
  marketAverage: number;

  @Column()
  result: 'ABOVE' | 'BELOW' | 'AVERAGE';
}
