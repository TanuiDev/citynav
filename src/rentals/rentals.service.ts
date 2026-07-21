import { Injectable, NotFoundException } from '@nestjs/common';
import { Rental } from './entities/rentals.entity';
import { RentalDTO } from './dto/rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {}

  async getAllRentals(): Promise<Rental[]> {
    return await this.rentalRepository.find();
  }

  async getRentalById(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({ where: { id } });
    if (!rental) {
      throw new NotFoundException('Rental not found');
    }
    return rental;
  }

  async createRental(rentalDTO: RentalDTO): Promise<Rental> {
    const rental = this.rentalRepository.create(rentalDTO);
    return await this.rentalRepository.save(rental);
  }

  async updateRental(id: number, rentalDTO: RentalDTO): Promise<Rental> {
    const rental = await this.getRentalById(id);
    Object.assign(rental, rentalDTO);
    return await this.rentalRepository.save(rental);
  }

  async deleteRental(id: number): Promise<void> {
    const rental = await this.getRentalById(id);
    await this.rentalRepository.remove(rental);
  }
}
