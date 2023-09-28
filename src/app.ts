import { CONSTANTS } from '@src/constants';
import { SystemService } from '@src/system/system.service';
import { ShuttlesService } from '@src/shuttles/shuttles.service';
import { IApp, IService, IModel, ObjToken, IInjectable } from '@src/types/app';
import { TaskModel } from './task/task.model';
import http from 'http';
// import { HCTypes } from '@src/types/global';
export let app!: IApp;
import express, { Express } from 'express';

class App implements IApp {
  objectMap!: Map<ObjToken, any>;
  socket!: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  express: Express;
  constructor() {
    this.express = express();
    this.init();
  }
  init(): void {
    this.objectMap = new Map();
  }

  register(token: ObjToken, instance: IInjectable): void {
    this.objectMap.set(token, instance);
  }
  resolve<T>(token: ObjToken): T {
    if (!this.objectMap.has(token)) {
      throw new Error('Token not found');
    }
    const dependency = this.objectMap.get(token);
    if (!dependency) {
      throw new Error('Token not found2');
    }
    return dependency as T;
  }

  async listen(port: number) {
    const socket = http.createServer(this.express);
    this.socket = socket;
    return socket;
  }
}

export class HCAppFactory {
  private constructor() {}
  static async create(): Promise<IApp> {
    app = new App();
    app.register(CONSTANTS.MODELS.TASK, new TaskModel());
    const systemService = new SystemService();
    const shuttlesService = new ShuttlesService();

    app.register(SystemService.name, systemService);
    app.register(ShuttlesService.name, shuttlesService);
    // app.resolve(SystemService.name);
    // app.getModel(CONSTANTS.MODELS.TASK);
    return app;
  }
}
