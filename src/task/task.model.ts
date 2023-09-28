import { IModel } from '@src/types/app';

export class TaskModel implements IModel {
  constructor() {}
  hello(name: string): string {
    console.log(`hello ${name}`);
    return `Hello ${name}`;
  }
}
