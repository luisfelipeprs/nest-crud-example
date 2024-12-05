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

  findById(id: string) {
    return this.collection.findUnique({ where: { id } });
  }

  async getUsers() {
    const users = await this.collection.findMany();
    return users;
  }

  createUser(user: UserEntity) {
    return this.collection.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
  
  updateUser(id: string, user: UserEntity) {
    return this.collection.update({
      where: { id },
      data: user,
    });
  }

  deleteUser(id: string) {
    return this.collection.delete({
      where: { id },
    });
  }
}