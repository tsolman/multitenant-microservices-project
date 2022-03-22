import { Module } from '@nestjs/common';
import { SourceController } from './controller/source.controller';
import { SourceService } from './service/source.service';

@Module({
  controllers: [SourceController],
  providers: [SourceService],
})
export class SourceModule {}
