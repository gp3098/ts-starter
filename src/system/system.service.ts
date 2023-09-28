import { IService, IModel, IInjectable } from '@src/types/app';
import { app } from '@src/app';
import { CONSTANTS } from '@src/constants';

//system.service.ts
// import { app } from './app';
export class SystemService implements IInjectable {
  taskModel: IModel;
  constructor() {
    this.taskModel = app.resolve(CONSTANTS.MODELS.TASK);
    this.init();
  }
  init() {
     this.taskModel.hello('world');
  }
}
