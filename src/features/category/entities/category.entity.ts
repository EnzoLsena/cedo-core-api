import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Product } from 'src/features/product/entities/product.entity';
import { User } from 'src/features/user/entities/user.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, user => user.categories, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
