import { Request, Response } from 'express';
import Joi from 'joi';
import { Admin } from '../../models';
import { RepositoryFactory } from '../../repositories';

/**
 * @api {delete} /api/admin/:Id Delete one admin
 * @apiName DeleteAdmin
 * @apiGroup Admin
 *
 * @apiParam {String} Id admin's objectId
 *
 * @apiSuccess {String} data deleted admin object
 * @apiSuccess {String} data._id admin's objectId
 * @apiSuccess {String} data.name admin's name
 * @apiSuccess {String} data.id admin's id
 * @apiSuccess {String} data.email admin's email
 * @apiSuccessExample {json} Success-Response:
 * {
 *    data: {
 *      "_id": "6189f67f256b654a514b7924"
 *      "name": "李大仁",
 *      "id": "CA12345",
 *      "email": "CA12345@school.com",
 *    }
 * }
 *
 * @apiUse UnprocessableEntityError
 * @apiUse UserNotFoundError
 * @apiUse InternalServerError
 */

export default async function ( req: Request, res: Response) {

  //Validate the fields in the request.params
  const schema: Joi.ObjectSchema = Joi.object({
    Id: Joi.string().required(),
  });

  //Run the validation check
  const validated = schema.validate(req.params, {
    abortEarly: false,
  });

  //Send error message as invalid inputs
  if (validated.error) {
    return res.status(422).json({
      error: validated.error.message,
      detail: validated.error.details,
    });
  }

  console.log('Delete Admin');

  const adminId = req.params.Id;

  try {
    const repo = RepositoryFactory('admin');
    const deletedAdmin: Admin = await repo.delete(adminId);

    return res.json({ data: deletedAdmin });
  } catch (error) {
    if (!error) {
      return res.status(404).json({ message: 'User Not Found' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}