export class UserByIdDto {
  id: string;
  name: string;
  email: string;

  constructor(partial: Partial<UserByIdDto>) {
    Object.assign(this, partial);
  }
}
