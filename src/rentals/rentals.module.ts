import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rentals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
