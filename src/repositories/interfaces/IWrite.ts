export interface IWrite<T> {

  create(_item: T): Promise<T>;
  update(_id: string, _item: any): Promise<T>;
  delete(_id: string): Promise<T>;
}