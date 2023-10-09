import { inject, injectable, LazyServiceIdentifer } from 'inversify';
import { B } from './b.service';
import { lazyInject } from '@/src/ioc/container';

export class A {
  @lazyInject(B)
  b?: B;

  hello = () => {
    console.log('hello a');
    this.b?.hello();
    console.log('call b :hello b in a');
  };
}
