import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saved } from './entities/saved.entity';

@Injectable()
export class SavedService {
  constructor(
    @InjectRepository(Saved)
    private savedRepository: Repository<Saved>,
  ) {}

  async getAllSaved(): Promise<Saved[]> {
    return this.savedRepository.find();
  }

  async createSaved(saved: Saved): Promise<Saved> {
    return this.savedRepository.save(saved);
  }

  async getSavedById(id: number): Promise<Saved> {
    const saved = await this.savedRepository.findOne({ where: { id } });
    if (!saved) {
      throw new NotFoundException('Saved item not found');
    }
    return saved;
  }

  async deleteSaved(id: number): Promise<{ message: string }> {
    const saved = await this.savedRepository.findOne({ where: { id } });
    if (!saved) {
      throw new NotFoundException('Saved item not found');
    }
    await this.savedRepository.remove(saved);
    return { message: 'Saved item deleted successfully' };
  }
}
