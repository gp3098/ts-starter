import 'reflect-metadata';
import { Container } from 'inversify';
import { SystemService } from './services/system.service';
// import { UserService } from '@src/services/UserService';
// import { OtherService } from '@src/services/OtherService';

const container = new Container();

container.bind<SystemService>(SystemService).toSelf();
// container.bind<OtherService>(OtherService).toSelf();

export { container };
