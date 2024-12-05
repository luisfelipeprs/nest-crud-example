import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "src/entities/user.entity";
import { UserDto } from "./dto/user.dto";
import { UserByIdDto } from "./dto/userById.dto";

@Controller('user')
export class UserController{
  constructor(private readonly userService : UserService){}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers()
  }
  
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserByIdDto> {
    const user = await this.userService.getUserById(id);
    return user
  }
  

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: { name: string; email: string; password: string }): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(@Param('id') id: string, @Body() user: UserEntity) {
    const updatedUser = await this.userService.updateUser(id, user);
    const userDto = new UserByIdDto({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email
    })
    return { message: 'User updated successfully', user: userDto };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }
}