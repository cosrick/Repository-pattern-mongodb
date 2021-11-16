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
};