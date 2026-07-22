import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  rentalId!: number;

  @IsNumber()
  @IsNotEmpty()
  userId!: number;
}
