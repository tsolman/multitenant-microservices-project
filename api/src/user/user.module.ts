import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { Config } from './entity/config.entity';
import { microservicesConfig } from './microservice.config';

const customProviders: Provider[] = [];

microservicesConfig.map((service) =>
  customProviders.push({
    provide: service.name,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.get(service.host),
          port: configService.get(service.port),
        },
      }),
  }),
);

@Module({
  imports: [TypeOrmModule.forFeature([User, Config]), ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [
    UserService,
    ...customProviders,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UserModule {}
