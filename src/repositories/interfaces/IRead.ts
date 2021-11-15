export interface IRead<T> {

  list(): Promise<T[]>;
  findOne(_id: string): Promise<T>;
  find(query: Partial<T>): Promise<T>;
  search(query: any): Promise<T[]>;
}