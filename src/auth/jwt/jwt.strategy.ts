import { CatsRepository } from './../../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 프론트로 넘겨줬을 때 만료 기간 설정
      secretOrKey: 'secret',
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub, // cat.id
    );

    if (cat) {
      return cat; // Save request.user : cat
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
