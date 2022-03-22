import { sourceConfigurations } from './source.decorator';
import { Provider } from '@nestjs/common';
import { SourceService } from './service/source.service';

const sourceFactory = (source: SourceService, input: object) => {
  if (input) {
    source.formatInput(input);
  }
  return source;
};

const createSourceProvider = (
  source: string,
  input: object,
): Provider<SourceService> => {
  return {
    provide: `SourceService[${source}]`,
    useFactory: (source) => sourceFactory(source, input),
    inject: [SourceService],
  };
};

export const createSourceProviders = (): Array<Provider<SourceService>> => {
  return sourceConfigurations.map((config) => {
    const { source = '', input = {} } = config;
    return createSourceProvider(source, input);
  });
};
