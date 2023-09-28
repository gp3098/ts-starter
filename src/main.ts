import { HCAppFactory } from '@src/app';

async function bootstrap() {
  const app = await HCAppFactory.create();
  await app.listen(3000);
}
bootstrap().catch();
