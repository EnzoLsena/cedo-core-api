import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Product } from 'src/features/product/entities/product.entity';
import { RecipeItem } from './recipe-items.entity';

@Entity('recipes')
export class Recipe extends BaseEntity {
  @OneToOne(() => Product, product => product.recipe)
  product: Product;

  @Column('decimal', { default: 0 })
  laborCost: number;

  @Column('decimal', { default: 0 })
  totalCost: number;

  @OneToMany(() => RecipeItem, item => item.recipe, { cascade: true })
  items: RecipeItem[];
}
