import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Put, UseGuards,Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from 'src/auth/dto/update.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return this.userService.getALlUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserProfile(@Req() req: Request) {
    return this.userService.getUserProfile((req.user as any).id);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }

  @Put('update/:id')
  @HttpCode(200)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDTO,
  ): Promise<{ message: string }> {
    return this.userService.updateUser(id, dto);
  }
  
}
