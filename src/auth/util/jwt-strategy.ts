import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ApiRes } from 'src/utils/payloadRes';
import { Users } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt.payload';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Users> {
    const { user_id, email } = payload;
    const user = this.userRepository.findOneBy({ id: user_id });

    if (!user) {
        ApiRes('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
