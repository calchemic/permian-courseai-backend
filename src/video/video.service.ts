import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { User } from '../model/user.model';
import { Video } from '../model/video.model';
import { BaseService } from '../base/base.service';
import { InjectModel } from 'nestjs-typegoose';
import { Ref, ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class VideoService extends BaseService<Video> {
  constructor(
    @InjectModel(Video)
    private readonly videoModel: ReturnModelType<typeof Video>,
  ) {
    super(videoModel);
  }

  create(createVideoDto: CreateVideoDto, user: Partial<User>) {
    const toBeCreated: Partial<Video> = { ...createVideoDto };
    toBeCreated.user = user._id as unknown as Ref<User>;
    return this.model.create(toBeCreated);

    return 'This action adds a new video';
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
