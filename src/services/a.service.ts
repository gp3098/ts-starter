import { inject, injectable, LazyServiceIdentifer } from 'inversify';
import { B } from './b.service';
import { lazyInject } from '@/src/ioc/container';
import { TYPES } from '@/src/ioc';
import { provide } from 'inversify-binding-decorators';

export class A {
  @lazyInject(B)
  b?: B;

  hello = () => {
    console.log('hello a');
    this.b?.hello();
    console.log('call b :hello b in a');
  };
}
