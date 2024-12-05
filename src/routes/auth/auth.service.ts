import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { hashPassword } from 'src/utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string) {
    // const hashedPassword = await hashPassword(password);
    // console.log("hashedPassword > ", hashedPassword);
    
    const user = await this.userService.validateUser(email, password);
    console.log("user jwt auth > ", user);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
