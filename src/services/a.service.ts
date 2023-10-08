import { inject } from 'inversify';
import { B } from './b.service';

export class A {
  @inject(B)
  b!: B;
  hello = () => {
    console.log('hello a');
    this.b.hello();
    console.log('call b :hello b in a');
  };
}
