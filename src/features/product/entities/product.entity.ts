import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Category } from 'src/features/category/entities/category.entity';
import { Recipe } from 'src/features/recipe/entities/recipe.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  salePrice: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToOne(() => Recipe, recipe => recipe.product, { nullable: true })
  recipe?: Recipe;
}
