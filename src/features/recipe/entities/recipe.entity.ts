import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Product } from 'src/features/product/entities/product.entity'; 
import { RecipeItem } from './recipe-items.entity'; 
@Entity('recipes')
export class Recipe extends BaseEntity {
  @ManyToOne(() => Product)
  product: Product;

  @Column('decimal')
  laborCost: number;

  @OneToMany(() => RecipeItem, item => item.recipe, { cascade: true })
  items: RecipeItem[];
}
