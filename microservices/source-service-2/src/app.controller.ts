import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  @EventPattern({ cmd: 'hello' })
  hello(input?: object): string {
    return `Hello, ${input || 'there'}!`;
  }
}
