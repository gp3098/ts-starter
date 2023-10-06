import { SystemService } from '@/src/services/system.service';
import { Controller } from '@/src/types/controller';
import express, { Express } from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue as QueueMQ } from 'bullmq';
import { QUEUES } from '@/src/constants';
import config from './config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { inject } from 'inversify';
import { container } from './container';

export class Application {
  express: Express;
  // systemService: SystemService;
  constructor(props: { controllers: Controller[] }) {
    this.express = express();
    this.initBullMQ();
    this.initRoutes();
    // console.log('container', container);
    // this.systemService = container.get(SystemService);
    this.initControllers(props.controllers);
  }
  initBullMQ() {
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
    this.express.use(queueUIBasePath, serverAdapter.getRouter());
    createBullBoard({
      queues: [new BullMQAdapter(appQueue)],
      serverAdapter,
    });
  }
  initRoutes() {
    this.express.use(compression());
    this.express.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
    this.express.use(bodyParser.json());
    this.express.use(cors());
    // app.options('*', cors());
    this.express.use(cookieParser());
  }
  initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.express.use('/api', controller.router);
    });
  }

  listen(port: number) {
    this.express.listen(port);
  }
}
