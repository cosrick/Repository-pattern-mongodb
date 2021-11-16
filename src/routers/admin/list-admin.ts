import { Request, Response } from 'express';
import { Admin } from '../../models';
import { RepositoryFactory } from '../../repositories';

/**
 * @api {get} /api/admins List all admins
 * @apiName ListAdmin
 * @apiGroup Admin
 *
 * @apiSuccess {Object[]} data list of admin information
 * @apiSuccess {String} data._id admin's object Id
 * @apiSuccess {String} data.name admin's name
 * @apiSuccess {String} data.id admin's id
 * @apiSuccess {String} data.email admin's email
 * @apiSuccessExample {json} Success-Response:
 * {
 *    data: [{
 *      "_id": "6189f67f256b654a514b7924"
 *      "name": "李大仁",
 *      "id": "CA12345",]
 *      "email": "CA12345@school.com",
 *    },{...}]
 * }
 *
 * @apiUse InternalServerError
 */


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