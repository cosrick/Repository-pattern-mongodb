import { Model } from 'mongoose';
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {

  private _model: Model<T>;

  constructor(_model: Model<T>) {
    this._model = _model;
  }

  list(): Promise<T[]> {
    return new Promise((resolve, reject): void => {
      this._model.find({})
        .then((items): void => {
          resolve(items);
        }).catch((error): void => {
          reject(error);
        });
    });
  }
  find(query: Partial<T>): Promise<T> {
    return new Promise((resolve, reject): void => {
      this._model.findOne(query)
        .then((item): void => {
          if (!item) {
            reject(null);
          } else {
            resolve(item);
          }
        }).catch((error): void => {
          reject(error);
        });
    });
  }
  findOne(id: string): Promise<T> {
    return new Promise((resolve, reject): void => {
      this._model.findById(id)
        .then((item): void => {
          if (!item) {
            reject(null);
          } else {
            resolve(item);
          }

        }).catch((error): void => {
          reject(error);
        });
    });
  }
  search(query: any): Promise<T[]> {
    return new Promise((resolve, reject): void => {
      this._model.find(query)
        .then((items): void => {
          resolve(items);
        }).catch((error): void => {
          reject(error);
        });
    });
  }
  create(item: T): Promise<T> {
    return new Promise((resolve, reject): void => {
      this._model.create(item)
        .then((createdAdmin): void => {
          resolve(createdAdmin);
        }).catch((error): void => {
          reject(error);
        });
    });
  }
  update(id: string, item: any): Promise<T> {
    return new Promise((resolve, reject): void => {
      this._model.findByIdAndUpdate(id, item)
        .then((updatedItem): void => {
          if (!updatedItem) {
            reject(null);
          } else {
            resolve(updatedItem);
          }
        }).catch((error): void => {
          reject(error);
        });
    });
  }
  delete(id: string): Promise<T> {
    return new Promise((resolve, reject): void => {
      this._model.findByIdAndDelete(id).then((deletedItem): void => {
        if (!deletedItem) {
          reject(null);
        } else {
          resolve(deletedItem);
        }
      }).catch((error): void => {
        reject(error);
      });
    });
  }
};