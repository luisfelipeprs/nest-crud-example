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
    console.log("users > ", users);
    return users;
  }

  createUser(user: UserEntity) {
    console.log("got user create > ", user);
    return this.collection.create({ data: user });
  }

}