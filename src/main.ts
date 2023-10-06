import 'reflect-metadata';
import { Application } from '@/src/Application.service';
import { SystemController } from '@/src/controllers/System.controller';
// import { SystemService } from '@/src/services/system.service';
import { container } from '@/src/container';

// const systemService = new SystemService();
// const controllers = [new SystemController()];
const controllers = [container.get(SystemController)];
export const app = new Application({ controllers });
async function main() {
  app.listen(8888);

  console.log(`app is running at http://0.0.0.0:8888`);
}

main().catch(console.error);
