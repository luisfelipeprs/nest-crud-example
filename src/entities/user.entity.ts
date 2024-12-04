import { User } from "@prisma/client";
import { Exclude } from "class-transformer";


export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  @Exclude() // cant return password
  password: string;

  constructor(user: User) {
    Object.assign(this, user);
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