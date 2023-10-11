import { container } from '@/src/ioc/container';
import { autoProvide } from 'inversify-binding-decorators';
import * as services from '@/src/services';
autoProvide(container, services);

export { container };
