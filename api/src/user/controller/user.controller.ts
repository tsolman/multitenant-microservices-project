import { Controller, Post, Get, Body, ValidationPipe } from '@nestjs/common';
import { map } from 'rxjs';
import { CreateConfigRequest } from '../payloads/create-config.request';
import { CreateUserRequest } from '../payloads/create-user.request';
import { GetConfigRequest } from '../payloads/get-config.request';
import { ReadConfigRequest } from '../payloads/read-config.request';
import { Roles } from '../roles.decorator';
import { UserService } from '../service/user.service';
import { UserRole } from '../types';
import { UserDto } from './../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('/')
  create(@Body() user: CreateUserRequest): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Get('/')
  getAll() {
    return this.userService.findAll();
  }

  @Post('/createConfig')
  @Roles(UserRole.AUTHOR)
  async createConfig(@Body(new ValidationPipe()) data: CreateConfigRequest) {
    return await this.userService.addConfiguration(data);
  }

  @Post('/readSource')
  async readSource(@Body() data: ReadConfigRequest) {
    const res = await this.userService.readSource(data);
    return await res.pipe(map((value: object) => value));
  }

  @Post('/readSource2')
  async readSource2(@Body() data: ReadConfigRequest) {
    const res = await this.userService.readSource2(data);
    return await res.pipe(map((value: object) => value));
  }

  @Get('/listConfigs')
  async listSources(@Body() data: GetConfigRequest) {
    return await this.userService.getSourcesByUser(data.userId);
  }
}
