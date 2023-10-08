import { inject } from 'inversify';
import { A } from './a.service';

export class B {
  @inject(A)
  a!: A;
  hello = () => {
    console.log('hello b');
    this.a.hello();
    console.log('call circular dependency a :hello a in b');
  };
}
