import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from 'src/auth/dto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return this.userService.getALlUsers();
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
  @Get('profile/:id')
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserProfile(id);
  }
}
