import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UserEntity } from "src/entities/user.entity";

@Injectable()
export class UserRepository {
  private collection: Prisma.UserDelegate;

  constructor(private prisma: PrismaService) {
    this.collection = prisma.user;
  }
  
  async getUsers() {
    const users = await this.collection.findMany();
    return users;
  }

  async findById(id: string) {
    return this.collection.findUnique({ where: { id } });
  }
  
  async createUser(user: UserEntity) {
    return await this.collection.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async userByEmail(email: string) {
    return await this.collection.findUnique({ where: { email } });
  }

  async updateUser(id: string, user: UserEntity) {
    return await this.collection.update({
      where: { id },
      data: user,
    });
  }

  async deleteUser(id: string) {
    return await this.collection.delete({
      where: { id },
    });
  }
}