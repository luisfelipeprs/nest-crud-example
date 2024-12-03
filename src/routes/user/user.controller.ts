import { Body, Controller, Get, Param, Post, Query, Req, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import { UserEntity } from "src/entities/user.entity";
@Controller('user')
export class UserController{
  constructor(private readonly userService : UserService){}
  @Get()
  getUsers() {
    console.log("on controller getUsers");
    return this.userService.getUsers()
  }
  
  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log("on controller getUserById");
    // if(!id) throw new UnauthorizedException(); // redundante
    return this.userService.getUserById(id)
  }

  @Post()
  async createUser(@Body() user: UserEntity) {
      console.log("user on controller > ", user);
      
      const createdUser = await this.userService.createUser(user);
      return { message: 'User created successfully', user: createdUser };
  }
  
}