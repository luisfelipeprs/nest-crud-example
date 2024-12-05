import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/database/repositories/user.repository";
import { UserEntity } from "src/entities/user.entity";
import { UserDto } from "./dto/user.dto";
import { hashPassword } from "src/utils/hashPassword";
import { UserByIdDto } from "./dto/userById.dto";
import { STATUS_CODES } from "http";

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

}