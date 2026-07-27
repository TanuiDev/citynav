import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saved } from './entities/saved.entity';
@Module({
  providers: [SavedService],
  controllers: [SavedController],
  imports: [TypeOrmModule.forFeature([Saved])],
})
export class SavedModule {}
