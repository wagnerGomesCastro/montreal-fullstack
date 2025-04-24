import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  async index() {
    return this.userService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: string | number) {
    return this.userService.findOneOrFail(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string | number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string | number) {
    return this.userService.remove(+id);
  }
}
