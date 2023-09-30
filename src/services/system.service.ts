import { ISystemService } from './../types/system.d';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

@injectable()
export class SystemService implements ISystemService {
  constructor() {}
  hello = () => {
    return `Hello inject`;
  };
  // hello(name: string) {
  //   return `Hello ${name}`;
  // }
}
