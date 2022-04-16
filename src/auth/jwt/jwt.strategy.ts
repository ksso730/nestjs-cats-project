import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 프론트로 넘겨줬을 때 만료 기간 설정
      secretOrKey: 'secret',
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  // }
}
