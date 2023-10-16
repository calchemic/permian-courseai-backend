import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '../base/base.service';
import { Role, User } from '../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Generator } from '../common/generator.service';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService extends BaseService<User> implements OnModuleInit {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    private readonly generator: Generator,
  ) {
    super(userModel);
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  public async getUser(getUserDto: GetUserDto): Promise<Partial<User>> {
    const foundUser = await this.userModel.findById(getUserDto.id);

    if (!foundUser) {
      throw new BadRequestException('Invalid user');
    }

    return foundUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async onModuleInit() {
    await this.userModel.updateOne(
      { email: 'demo@permian.ai' },
      {
        $setOnInsert: {
          email: 'demo@permian.ai',
          password:
            '$2a$12$Fp4szxcF7XCESkAfz2LWWeZ5x3KV7M0N8gbdz7CuWIgrejFcut5dC',
          role: Role.Student,
          firstName: 'Demo',
          lastName: 'Permian',
        },
      },
      { upsert: true },
    );
  }
}
