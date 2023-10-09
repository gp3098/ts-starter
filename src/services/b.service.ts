import { LazyServiceIdentifer, inject, injectable } from 'inversify';
import { A } from './a.service';
import { lazyInject } from '@/src/ioc/container';
import { TYPES } from '@/src/ioc';
import { provide } from 'inversify-binding-decorators';

// @provide(TYPES.B)
// @injectable()
export class B {
  // constructor(@inject(new LazyServiceIdentifer(() => TYPES.A)) private a: A) {}
  // @inject(new LazyServiceIdentifer(() => TYPES.A))
  @lazyInject(A)
  a?: A;
  hello = () => {
    console.log('hello b');
    this.a?.hello();
    console.log('call circular dependency a :hello a in b');
  };
}
