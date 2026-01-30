import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { EUserType } from 'src/common/enum/user-type-enum';
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
}
