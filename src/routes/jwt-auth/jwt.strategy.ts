import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
// interface para o payload

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrai token
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.id, email: payload.email }; //  injetado no req.user
  }
}
