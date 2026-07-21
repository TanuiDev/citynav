import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalDTO } from './dto/rental.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  async getAllRentals() {
    return this.rentalsService.getAllRentals();
  }

  @Get(':id')
  async getRentalById(@Param('id') id: number) {
    return this.rentalsService.getRentalById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createRental(@Body() rentalDto: RentalDTO) {
    return this.rentalsService.createRental(rentalDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  async updateRental(@Param('id') id: number, @Body() rentalDto: RentalDTO) {
    return this.rentalsService.updateRental(id, rentalDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async deleteRental(@Param('id') id: number) {
    return this.rentalsService.deleteRental(id);
  }
}
