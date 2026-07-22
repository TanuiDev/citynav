import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Rental } from '../../rentals/entities/rentals.entity';

@Entity('favorites')
@Unique(['userId', 'rentalId'])
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  userId!: number;

  @ManyToOne(() => Rental, { onDelete: 'CASCADE' })
  rental!: Rental;

  @Column()
  rentalId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
