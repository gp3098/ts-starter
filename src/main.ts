import 'reflect-metadata';
// import { Application } from '@/src/Application.service';
import { SystemController } from '@/src/controllers/SystemController';
// import { SystemService } from '@/src/services/system.service';
import { container } from '@/src/ioc';
import { App } from './Application.service';

// const systemService = new SystemService();
// const controllers = [new SystemController()];
// const controllers = [container.get(SystemController)];
// export const app = new Application({ controllers });
async function main() {
  const app = container.get(App);
  // app.init();
}

main().catch(console.error);
