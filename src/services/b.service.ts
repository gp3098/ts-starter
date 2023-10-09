import { A } from './a.service';
import { lazyInject } from '@/src/ioc/container';

export class B {
  @lazyInject(A)
  a?: A;
  hello = () => {
    console.log('hello b');
    this.a?.hello();
    console.log('call circular dependency a :hello a in b');
  };
}
