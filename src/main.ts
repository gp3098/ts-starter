import 'reflect-metadata';
import { container } from '@/src/ioc';
import { App } from './Application.service';

async function main() {
  const app = container.get(App);
  setTimeout(() => {
    app.init();
  }, 0);
}

main().catch(console.error);
