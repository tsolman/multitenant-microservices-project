import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { Config } from '../entity/config.entity';
import { CreateConfigRequest } from '../payloads/create-config.request';
import { CreateUserRequest } from '../payloads/create-user.request';
import { ReadConfigRequest } from '../payloads/read-config.request';
import { UserRole } from '../types';
import { User } from './../entity/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
    @Inject('SOURCE_MICROSERVICE_1') private readonly client: ClientProxy,
    @Inject('SOURCE_MICROSERVICE_2') private readonly client2: ClientProxy,
  ) {}

  create(user: CreateUserRequest): Promise<User> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  getUserById(id: number): Promise<UserDto> {
    return this.userRepository.findOne({ id });
  }

  addConfiguration(data: CreateConfigRequest) {
    return this.configRepository.save(data);
  }

  async readSource(data: ReadConfigRequest) {
    const res = await this.configRepository.findOne({ id: data.inputId });
    return await this.client.send({ cmd: 'format-user-input' }, res?.input);
  }

  async readSource2(data: ReadConfigRequest) {
    const res = await this.configRepository.findOne({ id: data.inputId });
    return await this.client2.send({ cmd: 'format-user-input' }, res?.input);
  }

  async getSourcesByUser(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });
    switch (user.role) {
      case UserRole.AUTHOR:
        return await this.configRepository.find({ user: { id: userId } });
      case UserRole.READER:
        const workspaceUsers = await this.userRepository.find({
          workspaceId: user.workspaceId,
        });
        const userIds = workspaceUsers.map((user) => user.id);

        if (userIds.length > 0) {
          const res = await this.configRepository
            .createQueryBuilder('config')
            .where('config.userId IN (:...userIds)', { userIds })
            .getMany();

          return res;
        } else return [];
      default:
        break;
    }
  }
}
