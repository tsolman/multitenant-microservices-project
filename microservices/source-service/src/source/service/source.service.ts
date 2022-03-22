import { Injectable } from '@nestjs/common';

@Injectable()
export class SourceService {
  formatInput = (input: object): object => {
    return { ...input, addedField: 'This is a new value' };
  };
}
