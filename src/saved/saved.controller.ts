import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SavedService } from './saved.service';
import { Saved } from './entities/saved.entity';

@Controller('saved')
export class SavedController {
  constructor(private savedService: SavedService) {}

  @Get()
  async getAllSaved(): Promise<Saved[]> {
    return this.savedService.getAllSaved();
  }

  @Get(':id')
  async getSavedById(@Param('id') id: number): Promise<Saved> {
    return this.savedService.getSavedById(id);
  }

  @Post()
  async createSaved(@Body() saved: Saved): Promise<Saved> {
    return this.savedService.createSaved(saved);
  }

  @Get('user/:userId')
  async getSavedByUserId(@Param('userId') userId: number): Promise<Saved> {
    return this.savedService.getSavedById(userId);
  }
  @Delete(':id')
  async deleteSaved(@Param('id') id: number): Promise<{ message: string }> {
    return this.savedService.deleteSaved(id);
  }
}
