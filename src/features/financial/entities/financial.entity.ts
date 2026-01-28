import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';

@Entity('financial_entries')
export class FinancialEntry extends BaseEntity {
  @Column()
  type: 'INCOME' | 'EXPENSE';

  @Column('decimal')
  amount: number;

  @Column()
  description: string;

  @Column()
  referenceDate: Date;
}
