import { Controller } from '@nestjs/common';
import { SavedService } from './saved.service';
import { Saved } from './entities/saved.entity';

@Controller('saved')
export class SavedController {
  constructor(private savedService: SavedService) {}
  async getAllSaved(): Promise<Saved[]> {
    return this.savedService.getAllSaved();
  }

  async getSavedById(id: number): Promise<Saved> {
    return this.savedService.getSavedById(id);
  }

  async createSaved(saved: Saved): Promise<Saved> {
    return this.savedService.createSaved(saved);
  }

  async getSavedByUserId(userId: number): Promise<Saved[]> {
    return this.savedService.getSavedByUserId(userId);
  }

  async deleteSaved(id: number): Promise<{ message: string }> {
    return this.savedService.deleteSaved(id);
  }
}
