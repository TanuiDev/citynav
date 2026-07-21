import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  location!: string;

  @Column({ type: 'text', array: true })
  images!: string[];

  @Column({ default: true })
  isAvailable!: boolean;

  @Column()
  user_id!: number;

  @Column({ type: 'text', array: true })
  amenities!: string[];

  @ManyToOne(() => User, user => user.rentals)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
