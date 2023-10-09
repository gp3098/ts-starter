import 'reflect-metadata';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

const { lazyInject } = getDecorators(container, true);
export { container, lazyInject };
