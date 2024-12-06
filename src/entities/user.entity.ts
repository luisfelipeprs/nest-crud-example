import { User } from "@prisma/client";
import { Exclude } from "class-transformer";
import { UserDto } from "../routes/user/dto/user.dto";
import { plainToInstance } from "class-transformer";

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  @Exclude() // can't return password
  password: string;

  constructor(user: User) {
    Object.assign(this, user);
  }

  toDto(): UserDto {
    return plainToInstance(UserDto, this);
  }

  static mock(partial?: Partial<User>): UserEntity {
    return new UserEntity({
      id: 'user-id',
      name: 'test-name',
      email: 'test@email.com',
      password: 'password123',
      ...partial,
    });
  }
}