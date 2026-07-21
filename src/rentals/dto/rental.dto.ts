import {  IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsBoolean  } from 'class-validator';

export class RentalDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  amenities?: string[];

  @IsBoolean()
  @IsNotEmpty()
  isAvailable!: boolean;

  @IsNumber()
  @IsNotEmpty()
  user_id!: number;
}
