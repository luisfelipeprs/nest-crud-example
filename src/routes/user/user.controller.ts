import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import { UserEntity } from "src/entities/user.entity";
@Controller('user')
export class UserController{
  constructor(private readonly userService : UserService){}
  @Get()
  getUsers() {
    return this.userService.getUsers()
  }
  
  @Get(':id')
  getUserById(@Param('id') id: string) {
    // if(!id) throw new UnauthorizedException(); // redundante
    return this.userService.getUserById(id)
  }

  @Post()
  async createUser(@Body() user: UserEntity) {
      const createdUser = await this.userService.createUser(user);
      return { message: 'User created successfully', user: createdUser };
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UserEntity) {
    console.log('Updating user with id > ', id);
    const updatedUser = await this.userService.updateUser(id, user);
    return { message: 'User updated successfully', user: updatedUser };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    console.log('Deleting user with id > ', id);
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
  
}