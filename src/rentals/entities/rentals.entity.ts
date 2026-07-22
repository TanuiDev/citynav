import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Saved } from 'src/saved/entities/saved.entity';

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Saved, (saved) => saved.rental)
  saved!: Saved[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
