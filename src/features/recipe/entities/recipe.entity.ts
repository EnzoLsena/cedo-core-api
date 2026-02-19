import { Entity, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Product } from 'src/features/product/entities/product.entity';
import { RecipeItem } from './recipe-items.entity';
import { User } from 'src/features/user/entities/user.entity';

@Entity('recipes')
export class Recipe extends BaseEntity {
  @ManyToOne(() => User, user => user.recipes, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Product, product => product.recipe)
  product: Product;

  @Column('decimal', { default: 0 })
  laborCost: number;

  @Column('decimal', { default: 0 })
  totalCost: number;

  @OneToMany(() => RecipeItem, item => item.recipe, { cascade: true })
  items: RecipeItem[];
}
