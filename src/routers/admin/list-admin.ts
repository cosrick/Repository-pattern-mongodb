import { Request, Response } from 'express';
import { Admin } from '../../models';
import { RepositoryFactory } from '../../repositories';

export default async function ( _req: Request, res: Response) {

  console.log('List Admin');

  try {
    const repo = RepositoryFactory('admin');
    const adminList: Admin[] = await repo.list();

    return res.json({ data: adminList });
  } catch (error) {
    console.error(error);
    return res.status(500).json( { message: 'Internal Server Error' });
  }
}