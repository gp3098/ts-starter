import { container } from '@src/container';
import { SystemService } from '@src/services/system.service';
import { Controller } from '@src/types/controller';
import express, { Express, Request, Response, Router } from 'express';
export class SystemController implements Controller {
  router: Router = express.Router();
  selfRouter = express.Router();
  basePath = '/system';
  private systemService: SystemService;
  constructor() {
    this.initRoutes();
    // this.systemService = systemService;
    this.systemService = container.get(SystemService);
  }

  initRoutes() {
    this.router.use(this.basePath, this.selfRouter);
    this.selfRouter.get('/hello', this.hello);
  }

  hello = (req: Request, res: Response) => {
    res.send(this.systemService.hello());
  };
}
