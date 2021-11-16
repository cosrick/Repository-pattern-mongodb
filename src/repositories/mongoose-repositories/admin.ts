import { Model } from 'mongoose';
import { Admin } from '../../models';
import { BaseRepository } from '../base-repository';

export class AdminRepository extends BaseRepository<Admin> {

  private _model: Model<Admin>;

  constructor(model: Model<Admin>) {
    super();
    this._model = model;
  }

  public create(item: Admin): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this._model.create(item)
        .then((createdAdmin) => {
          resolve(createdAdmin);
        }).catch((error) => {
          reject(error);
        });
    });
  };

  public list(): Promise<Admin[]> {
    return new Promise((resolve, reject) => {
      this._model.find({})
        .then((admins) => {
          resolve(admins);
        }).catch((error)=>{
          reject(error);
        });
    });
  }

  public delete(id: string): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndDelete(id)
        .then((deletedAdmin) => {
          if (!deletedAdmin) {
            reject(null);
          } else {
            resolve(deletedAdmin);
          }
        }).catch((error) => {
          reject(error);
        });
    });
  }

  public update(id: string): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndUpdate(id)
        .then((updatedAdmin) => {
          if (!updatedAdmin) {
            reject(null);
          } else {
            resolve(updatedAdmin);
          }
        }).catch((error) => {
          reject(error);
        });
    });
  }

  public find(query: Partial<Admin>): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this._model.findOne(query)
        .then((admin) => {
          if (!admin) {
            reject(null);
          } else {
            resolve(admin);
          }
        }).catch((error) => {
          reject(error);
        });
    });
  }

  public findOne(id: string): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this._model.findById(id)
        .then((admin) => {
          if (!admin) {
            reject(null);
          } else {
            resolve(admin);
          }
        }).catch((error) => {
          reject(error);
        });
    });
  }

  public search(query: any): Promise<Admin[]> {
    return new Promise((resolve, reject) => {
      this._model.find(query)
        .then((admins) => {
          resolve(admins);
        }).catch((error) => {
          reject(error);
        });
    });
  }

};