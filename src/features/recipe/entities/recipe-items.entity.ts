import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
import { Recipe } from './recipe.entity';

@Entity('recipe_items')
export class RecipeItem extends BaseEntity {
  @ManyToOne(() => Recipe, recipe => recipe.items)
  recipe: Recipe;

  @Column()
  ingredientName: string;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  unitCost: number;
}
