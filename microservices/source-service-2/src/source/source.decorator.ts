import { Inject } from '@nestjs/common';

interface Source {
  source: string;
  input: object;
}

export const sourceConfigurations: Source[] = new Array<Source>();

export function Config(source: string, input: object = {}) {
  sourceConfigurations.push({ source, input });
  return Inject(`SourceService[${source}]`);
}
