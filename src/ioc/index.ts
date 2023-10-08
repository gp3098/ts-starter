import getDecorators from 'inversify-inject-decorators';
import { container } from './container';
const { lazyInject } = getDecorators(container);
export { container, lazyInject };
