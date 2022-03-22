import { Injectable } from '@nestjs/common';

@Injectable()
export class SourceService {
  formatInput = (input: object): object => {
    return { ...input, thisIsSomethingElse: 'This is a new value' };
  };
}
