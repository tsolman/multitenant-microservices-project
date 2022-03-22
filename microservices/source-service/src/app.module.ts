import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SourceModule } from './source/source.module';

@Module({
  imports:[SourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
