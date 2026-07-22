import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Module({
  providers: [FavouritesService]
})
export class FavouritesModule {}
