import { SystemController } from '@/src/controllers/SystemController';
// import { Scheduler as SchedulerService } from '@src/instance/Scheduler';
// import { LibraryInfo as LibraryInfoService } from '@src/instance/LibraryInfo';
// import { ZigbeeGateways } from '@src/instance/ZigbeeGateways';
// import {
//   SortSocket as SortSocketService,
//   ConfigService as ConfigService,
//   System as SystemService,
// } from '@src/instance';
// import { HCDB } from '@src/db';
// import { HCLog } from '@src/helper/logger';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import moment from 'moment';
// import { Auth } from '@src/helper/auth';
import http from 'http';
import 'express-async-errors';
// import { globalObject } from '@src/instance/globalObject';
// import { createBullBoard } from '@bull-board/api';
// import { ExpressAdapter } from '@bull-board/express';
// import type { HCTypes } from '@root/global';
import { injectable, inject } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { container } from '@/src/ioc/container';
import * as prettyjson from 'prettyjson';
import { getRouteInfo } from 'inversify-express-utils';

// declare metadata by @controller annotation
import '@/src/controllers/SystemController';
import { lazyInject } from './ioc';
import { A, B } from './services';

@injectable()
export class App {
  socket: http.Server | null = null;
  // queueUIBasePath = '/admin/queues';
  app: any;
  // controllers: any;
  server!: InversifyExpressServer;
  serverPort: number = 8888;

  @inject(A)
  a!: A;

  @inject(B)
  b!: B;

  // @inject(HCLog)
  // private logger!: HCLog;
  // @inject('config')
  // private config!: HCTypes.Config;
  // @inject(Auth)
  // private auth!: Auth;

  // @inject(HCDB)
  // private db!: HCDB;

  // @inject(SortSocketService)
  // sortSocketService!: SortSocketService;

  // @inject(ConfigService)
  // configService!: ConfigService;

  // @inject(ZigbeeGateways)
  // zigbeeGateways!: ZigbeeGateways;

  // @inject(LibraryInfoService)
  // libraryInfoService!: LibraryInfoService;

  // @inject(SchedulerService)
  // schedulerService!: SchedulerService;

  // @lazyInject(SystemService)
  // systemService!: SystemService;

  // constructor(
  //   @inject(HCLog) private logger: HCLog,
  //   @inject('config') private config: HCTypes.Config,
  //   @inject(Auth) private auth: Auth,
  // ) {
  //   // this.init();
  // }

  // constructor(@inject(A) private a: A) {
  //   // this.init();
  // }
  async init() {
    this.a.hello();
    this.b.hello()
    this.initHttpModule();
    await this.initDBModule();
    await this.initServices();
  }
  initHttpModule() {
    this.server = new InversifyExpressServer(container, null, { rootPath: '/api' });
    this.handleProcessEvent();
    this.initEnvTimezone();
    // this.initializeControllers(this.controllers);
    this.initializeMiddlewares();
    // const app = this.server.build();
    // app.listen(this.config.serverPort, () => {
    //   this.logger.info(`server is running at http://127.0.0.1:${this.config.serverPort}`);
    // });
    this.listen();
  }

  async initDBModule() {
    // await this.db.init();
  }
  async initServices() {
    // this.sortSocketService.initSocket(this.server);
    // await this.configService.init();
    // await this.zigbeeGateways.init();
    // await this.libraryInfoService.init();
    // await this.schedulerService.init();
    // await this.systemService.init();
  }

  initEnvTimezone() {
    process.env.TZ = 'Asia/Shanghai';
  }

  handleProcessEvent() {
    /* eslint-disable no-unused-vars */
    process.on('unhandledRejection', (err: Error) => {
      // this.logger.error(`Unhandled Rejection: ${err.stack}`);
    });

    process.on('uncaughtException', (err: Error) => {
      console.log('uncaughtException: ', err);
      // this.logger.error(`uncaughtException: ${err.stack}`);
    });
  }

  initializeMiddlewares() {
    this.server.setConfig((app) => {
      app.use(compression());
      app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
      app.use(bodyParser.json());
      morgan.token('utc8date', () => {
        return moment().format('YYYY-MM-DD HH:mm:ss');
      });
      morgan.token('req-body', (req: Request) => {
        if (req.body) {
          return require('util').inspect(req.body, { depth: null });
        }
      });
      app.use(
        morgan(
          '-> :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] req-body: :req-body[pretty]',
          {
            immediate: true,
            // stream: this.stream,
          }
        )
      );
      app.use(
        morgan('<- :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length]', {
          immediate: false,
          // stream: this.logger.stream,
        })
      );
      app.use(this.globalErrorHandler);
      app.use(cors());
      app.options('*', cors());
      app.use(cookieParser());
      app.use(express.static(path.join(process.cwd(), './public')));
      app.use('/download', express.static(path.join(process.cwd(), './upload')));
      if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage') {
        app.get('*', (req: Request, res: Response) => {
          const indexPath = path.join(process.cwd(), './public/index.html');
          res.sendFile(indexPath);
        });
      }
      // app.use('/api', this.auth.authorize);
      // app.use((req: Request, res: Response) => {
      //   res.json({ success: false, msg: '404' });
      // });
    });
  }

  // initializeControllers(controllers: HCTypes.BaseController[]) {
  //   controllers.forEach((controller) => {
  //     // const basePath = controller.basePath ?? '';
  //     // this.app.use(`/api${basePath}`, auth.authorize, controller.router);
  //     this.app.use(`/api`, auth.authorize, controller.router);
  //   });
  //   this.app.use(this.globalErrorHandler);
  // }

  globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log('globalErrorHandler: ', err);
    if (err) {
      res.status(500).json({ success: false, msg: err.message });
    } else {
      next();
    }
  }

  listen() {
    this.app = this.server.build();
    const routeInfo = getRouteInfo(container);

    console.log('show all endpoints: ');
    console.log(prettyjson.render({ routes: routeInfo }));

    this.app.listen(this.serverPort, () => {
      // this.logger.info(`App listening on the port ${this.config.serverPort}`);
    });

    // const socket = http.createServer(app);
    // this.socket = socket;
    // return socket;
  }

  // createBullBoard = (params: any) => {
  //   const { queues, serverAdapter: _serverAdapter, options } = params;
  //   const serverAdapter = new ExpressAdapter();

  //   serverAdapter.setBasePath(this.queueUIBasePath);

  //   this.app.use(this.queueUIBasePath, serverAdapter.getRouter());

  //   return createBullBoard({
  //     queues,
  //     serverAdapter: _serverAdapter || serverAdapter,
  //     options,
  //   });
  // };
}
