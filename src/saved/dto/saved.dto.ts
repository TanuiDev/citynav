import { IsNotEmpty, IsString } from 'class-validator';

export class SaveUserDTO {
  @IsNotEmpty({ message: 'Item ID is required' })
  @IsString()
  itemId!: string;
}
