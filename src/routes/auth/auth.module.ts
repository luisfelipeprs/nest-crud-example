import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';
import { JwtStrategy } from '../jwt-auth/jwt.strategy';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
