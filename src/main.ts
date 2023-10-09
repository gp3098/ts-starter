import 'reflect-metadata';
import { container } from '@/src/ioc';
import { App } from './Application.service';

async function main() {
  const app = container.get(App);
  app.init();
}

main().catch(console.error);
