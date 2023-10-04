import 'reflect-metadata';
import { Container } from 'inversify';
import { SystemService } from './services/system.service';
import { autoProvide, buildProviderModule } from 'inversify-binding-decorators';
// import { UserService } from '@src/services/UserService';
// import { OtherService } from '@src/services/OtherService';
import * as services from './services';

// const container = new Container({ defaultScope: 'Singleton' });
const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

// autoProvide(container, services);

// container.bind<SystemService>(SystemService).toSelf();

export { container };
