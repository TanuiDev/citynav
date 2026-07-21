import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/registeruser.dto';

import * as bcrypt from 'bcrypt';
import { userLoginDTO } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDTO } from './dto/update.user.dto';

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

  async loginUser(dto: userLoginDTO): Promise<{ accessToken: string ,message: string, user:{id:number,emailAddress:string,userName:string,phoneNumber:string,role:string,profileImage:string} }> {
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
    const payload= { id: user.id,userName:user.userName, emailAddress: user.emailAddress, role: user.role, profileImage: user.profileImage, phoneNumber: user.phoneNumber };
    const accessToken = this.jwtService.sign(payload);
    return { message: 'User logged in successfully', accessToken, user:{
        id: user.id,
        emailAddress: user.emailAddress,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        role: user.role,
      },
    };
  }

  async updateUser(id: number, dto: UpdateUserDTO): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, dto);
    await this.userRepository.save(user);

    return { message: 'User updated successfully' };
  }

  async getUserById(id: number): Promise<{id: number, emailAddress: string, userName: string, phoneNumber: string, profileImage: string, role: string}> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
