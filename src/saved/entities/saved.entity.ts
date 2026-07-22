import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Rental } from '../../rentals/entities/rentals.entity';

@Entity('saved')
@Unique(['user_id', 'rental_id']) // prevents saving the same rental twice
export class Saved {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.saved, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  user_id!: number;

  @ManyToOne(() => Rental, (rental) => rental.saved, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rental_id' })
  rental!: Rental;

  @Column()
  rental_id!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
