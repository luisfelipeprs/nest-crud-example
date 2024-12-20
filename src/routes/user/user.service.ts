import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../../database/repositories/user.repository";
import { UserEntity } from "../../entities/user.entity";
import { UserDto } from "./dto/user.dto";
import { hashPassword } from "../../utils/hashPassword";
import { UserByIdDto } from "./dto/userById.dto";

import * as argon2 from 'argon2';


@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.getUsers()
    if (!users || users.length === 0) throw new NotFoundException('Users Not Found');
    return users.map((user) => new UserDto({ id: user.id, name: user.name }));
  }

  async getUserById(id: string): Promise<UserByIdDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User Not Found');
    return new UserByIdDto({ id: user.id, name: user.name, email: user.email });
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<UserDto> {
    const userByEmail = await this.userRepository.userByEmail(data.email)

    if (userByEmail) {
      throw new ConflictException("A user with this email already exists");
    }
    const hashedPassword = await hashPassword(data.password);
    const userEntity = new UserEntity({
      id: '',
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.createUser(userEntity);

    return new UserDto({ id: savedUser.id, name: savedUser.name });
  }

  async updateUser(id: string, user: UserEntity) {
    const updatedUser = await this.userRepository.updateUser(id, user);
    if (!updatedUser) throw new NotFoundException('User Not Found');
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) throw new NotFoundException('User Not Found');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.userByEmail(email);
    console.log("user validate > ", user);

    if (user && await argon2.verify(user.password, password)) {
      return user; // senha valida
    }
    return null; //  credencial invalida
  }

}