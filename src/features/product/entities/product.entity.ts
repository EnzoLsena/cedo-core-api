import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
import { Recipe } from 'src/features/recipe/entities/recipe.entity'; 

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  salePrice: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Recipe, recipe => recipe.product)
  recipes: Recipe[];
}
