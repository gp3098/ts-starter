export interface IApp {
  // use(object: any): void;
  objectMap: Map<ObjToken, any>;
  // init(): void;
  register(token: ObjToken, instance: any): void;
  resolve<T extends IInjectable>(token: ObjToken): T;
  // getService(token: ObjToken): IService;
  // addModel(token: ObjToken, model: IModel): void;
  // getModel(token: ObjToken): IModel;
  listen(port: number): Promise<http.Server>;
}

export interface IInjectable {}

export interface IService {}
export interface IModel {
  hello(name: string): string;
}
export type ObjToken = string | symbol;
