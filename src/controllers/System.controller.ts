import { Controller } from '@src/types/controller';
import express, { Express, Request, Response, Router } from 'express';
export class SystemController implements Controller {
  router: Router = express.Router();
  selfRouter = express.Router();
  basePath = '/system';
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.use(this.basePath, this.selfRouter);
    this.selfRouter.get('/hello', this.hello);
  }

  hello(req: Request, res: Response) {
    res.send('hello world');
  }
}
