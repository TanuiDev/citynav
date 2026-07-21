import {  Controller,  Post,  Body,  HttpCode,  Put,  Param,  ParseIntPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/registeruser.dto';
import { userLoginDTO } from './dto/login.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
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
  @Put('update/:id')
  @HttpCode(200)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDTO,
  ): Promise<{ message: string }> {
    return this.authService.updateUser(id, dto);
  }
  @Get(':id')
  @HttpCode(200)
  async getUserById( @Param('id', ParseIntPipe ) id: number): Promise<{id: number, emailAddress: string, userName: string, phoneNumber: string, profileImage: string, role: string}> {
    const user = await this.authService.getUserById(id);
    return user;
  }
}
