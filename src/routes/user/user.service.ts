import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/database/repositories/user.repository";
import { UserEntity } from "src/entities/user.entity";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User Not Found');
    return new UserEntity(user);
  }

  async getUsers() {
    const users = await this.userRepository.getUsers()
    if (!users) throw new NotFoundException("Users Not Found")
    return users
  }

  async createUser(user: UserEntity) {
    console.log("service user: ", user);
    return await this.userRepository.createUser(user);
  }
  async updateUser(id: string, user: UserEntity) {
    const updatedUser = await this.userRepository.updateUser(id, user);
    if (!updatedUser) throw new NotFoundException('User Not Found');
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) throw new NotFoundException('User Not Found');
    return deleted;
  }

}