import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/registeruser.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async registerUser(dto: RegisterUserDTO): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findOne({
      where: {
        emailAddress: dto.emailAddress,
        userName: dto.userName,
        phoneNumber: dto.phoneNumber,
      },
    });
    if (existingUser) {
      throw new ConflictException('User already exist');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return { message: 'User registered successfully' };
  }
}
