import {  Controller,  Post,  Body,  HttpCode,  Put,  Param,  ParseIntPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/registeruser.dto';
import { userLoginDTO } from './dto/login.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { User } from './entities/user.entity';
import { User } from './entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterUserDTO): Promise<{ message: string }> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: userLoginDTO) {
    const user = await this.authService.loginUser(dto);
    return user;
  }
}
