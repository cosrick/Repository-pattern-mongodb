import { MongooseModel } from '../schemas';
import { BaseRepository } from './base-repository';
import * as MongooseRepo from './mongoose-repositories';

export function RepositoryFactory(tableName: string): BaseRepository<any> {

  switch (process.env.DB_ENV) {
    case 'mongodb': {
      switch (tableName) {
        case 'admin': return new MongooseRepo.AdminRepository(MongooseModel.AdminModel);
        default: throw new Error('Repository not found');
      }
    }
    default: throw new Error('Repository not found');
  }
}