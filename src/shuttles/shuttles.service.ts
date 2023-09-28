import { IService, IModel, IInjectable } from '@src/types/app';
import { app } from '@src/app';
import { CONSTANTS } from '@src/constants';
import { SystemService } from '@src/system/system.service';

//system.service.ts
// import { app } from './app';
export class ShuttlesService implements IInjectable {
  taskModel: IModel;
  systemService: SystemService;
  constructor() {
    this.taskModel = app.resolve(CONSTANTS.MODELS.TASK);
    this.systemService = app.resolve(SystemService.name);
    this.init()
  }
  init() {
    this.taskModel.hello('world1');
    this.systemService.taskModel.hello('world2');
  }
}
