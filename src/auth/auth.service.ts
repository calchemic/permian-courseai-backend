import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../model/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { compareSync } from 'bcryptjs';
import { JwtPayload } from './jwt.interface';
import { Generator } from '../common/generator.service';
import { NotificationEmails } from './auth.const';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
    protected readonly eventEmitter: EventEmitter2,
    private readonly generate: Generator,
  ) {}
  async login(loginDto: LoginDto) {
    const { email, password: userPass } = loginDto;

    const query = { email: email };

    const user = <User | null>await this.userModel.findOne(query).lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (NotificationEmails.includes(user.email)) {
      console.log(NotificationEmails);
      this.eventEmitter.emit('user.login', { email: user.email });
    }

    const { password } = user;
    if (!compareSync(userPass, password)) {
      throw new ForbiddenException('Incorrect password');
    }

    delete user.password;

    const payload: JwtPayload = {
      id: user._id.toString(),
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = await this.getAccessToken(payload);

    const response = {
      token,
      user,
      status: true,
    };

    return response;
  }

  async getAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
