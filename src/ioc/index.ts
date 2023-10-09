// import getDecorators from 'inversify-inject-decorators';
import { container } from '@/src/ioc/container';

// import { SystemService } from './services/system.service';
import { autoProvide, buildProviderModule } from 'inversify-binding-decorators';
// import { UserService } from '@src/services/UserService';
// import { OtherService } from '@src/services/OtherService';
import * as services from '@/src/services';
// import * as controllers from './controllers';
import { A } from '@/src/services/a.service';
import { B } from '@/src/services/b.service';
autoProvide(container, services);
export const TYPES = {
  A: Symbol.for('A'),
  B: Symbol.for('B'),
};

// const { lazyInject } = getDecorators(container, true);
// autoProvide(container, controllers);

// container.bind<SystemService>(SystemService).toSelf();
container.bind<A>(TYPES.A).to(A).inSingletonScope();
// container.bind<A>('A').to(A).inSingletonScope();
container.bind<B>(TYPES.B).to(B).inSingletonScope();
// export { container, lazyInject };
export { container };
