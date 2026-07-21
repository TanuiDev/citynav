import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from './user.roles';
import { Rental } from 'src/rentals/entities/rentals.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  userName!: string;

  @Column({ unique: true })
  emailAddress!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ unique: true })
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column()
  profileImage!: string;

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals!: Rental[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}