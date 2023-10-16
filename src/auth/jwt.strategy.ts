import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.interface';
import { User } from 'src/model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: `${process.env.JWT_SECRET}`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Partial<User>> {
    let id = payload.id;

    const user = await this.userService.getUser({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    let { _id, firstName, lastName, email, role } = user;

    return {
      _id,
      firstName,
      lastName,
      email,
      role,
    };
  }
}
