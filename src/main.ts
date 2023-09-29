import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue as QueueMQ } from 'bullmq';
import { QUEUES } from '@src/constants';
import config from './config';
async function main() {
  const app = express();
  const redisConnection = {
    host: config.localRedis.host,
    port: config.localRedis.port,
  };
  const appQueue = new QueueMQ(QUEUES.APP_QUEUE, {
    connection: redisConnection,
  });
  const serverAdapter = new ExpressAdapter();
  const queueUIBasePath = '/admin/queues';
  serverAdapter.setBasePath(queueUIBasePath);
  app.use(queueUIBasePath, serverAdapter.getRouter());
  createBullBoard({
    queues: [new BullMQAdapter(appQueue)],
    serverAdapter,
  });
  app.listen(8888);
  console.log(`app is running at http://0.0.0.0:8888`);
}

main().catch(console.error);
