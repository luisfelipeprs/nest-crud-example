import { User } from "@prisma/client";


export class UserEntity implements User {
  id: string;
  name: string;
  email: string;

  constructor(user: User) {
    Object.assign(this, user);
  }

  static mock(partial?: Partial<User>): UserEntity {
    return new UserEntity({
      id: 'user-id',
      name: 'test-name',
      email: 'test@email.com',
      ...partial,
    });
  }
}