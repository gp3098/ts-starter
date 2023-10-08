// import { Messenger } from '@src/helper/Messenger';
import 'reflect-metadata';
import { Container } from 'inversify';
import { autoProvide, buildProviderModule } from 'inversify-binding-decorators';
// import * as services from '@src/instance';
// import { ConfigModel as ConfigModel, ShutdownPointModel, ShuttleModel } from '@src/model';
// import { config } from '@root/config';
// import { HCDB } from '@src/db';
// import * as controllers from './controller';

const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

// autoProvide(container, services);
// autoProvide(container, controllers);

// container.bind<SystemService>(SystemService).toSelf();
// container.bind('config').toConstantValue(config);

// container.bind(HCDB).toSelf();

// container.bind(Messenger).toConstantValue(new Messenger());

// container.bind(ConfigModel).toConstantValue(ConfigModel);

// container.bind(ShutdownPointModel).toConstantValue(ShutdownPointModel);

// container.bind(ShuttleModel).toConstantValue(ShuttleModel);

export { container };
