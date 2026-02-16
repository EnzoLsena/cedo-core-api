import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Product } from 'src/features/product/entities/product.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
