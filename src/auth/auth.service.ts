import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/registeruser.dto';

import * as bcrypt from 'bcrypt';
import { userLoginDTO } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

  async loginUser(dto: userLoginDTO): Promise<{ accessToken: string ,message: string, user: User}> {
    const user = await this.userRepository.findOne({
      where: {
        emailAddress: dto.emailAddress,
      },
    });
    if (!user) {
      throw new ConflictException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }
    const payload= { userId: user.id,userName:user.userName, emailAddress: user.emailAddress, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return { message: 'User logged in successfully', accessToken, user:{
      id: user.id,
      emailAddress: user.emailAddress,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
      role: user.role,
    } };
  }
}
