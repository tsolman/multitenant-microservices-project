import { Controller } from '@nestjs/common';
import { SourceService } from '../service/source.service';
import { MessagePattern } from '@nestjs/microservices';
import { FormatInputEvent } from '../events/format-input.event';

@Controller()
export class SourceController {
  constructor(private readonly service: SourceService) {}

  @MessagePattern({ cmd: 'format-user-input' })
  formatInput(input: FormatInputEvent) {
    const res = this.service.formatInput(input);
    return res;
  }
}
