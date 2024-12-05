export class UserDto {
  id: string;
  name: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
