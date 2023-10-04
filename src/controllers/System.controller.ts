import { container } from '@src/container';
import { SystemService } from '@src/services/system.service';
import { Controller } from '@src/types/controller';
import express, { Express, Request, Response, Router } from 'express';
import { inject } from 'inversify';
export class SystemController implements Controller {
  router: Router = express.Router();
  selfRouter = express.Router();
  basePath = '/system';
  private systemService: SystemService;
  // constructor(@inject(SystemService) private systemService: SystemService) {
  constructor() {
    // constructor(@inject(SystemService) systemService: SystemService) {
    this.initRoutes();
    // this.systemService = systemService;
    this.systemService = container.get(SystemService);
    // this._systemService = systemService;
  }

  initRoutes() {
    this.router.use(this.basePath, this.selfRouter);
    this.selfRouter.get('/hello', this.hello);
  }

  hello = (req: Request, res: Response) => {
    res.send(this.systemService.hello());
  };
}
