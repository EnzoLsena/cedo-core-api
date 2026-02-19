import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { EUserType } from 'src/common/enum/user-type.enum';
import { Category } from 'src/features/category/entities/category.entity';
import { Product } from 'src/features/product/entities/product.entity';
import { Customer } from 'src/features/customer/entities/customer.entity';
import { Order } from 'src/features/order/entities/order.entity';
import { Recipe } from 'src/features/recipe/entities/recipe.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: EUserType,
    default: EUserType.COMMON,
  })
  role: EUserType;

  @OneToMany(() => Category, category => category.user)
  categories: Category[];

  @OneToMany(() => Product, product => product.user)
  products: Product[];

  @OneToMany(() => Customer, customer => customer.user)
  customers: Customer[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes: Recipe[];
}
