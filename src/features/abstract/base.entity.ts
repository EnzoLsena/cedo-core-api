import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: string;

  @DeleteDateColumn({ select: false })
  deletedAt: string | null;
}
