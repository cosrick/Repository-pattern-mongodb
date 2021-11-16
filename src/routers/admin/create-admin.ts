import { Request, Response } from 'express';
import Joi from 'joi';
import { Admin } from '../../models';
import { RepositoryFactory } from '../../repositories';

/**
 * @api {post} /api/admin Create one admin
 * @apiName CreateAdmin
 * @apiGroup Admin
 *
 * @apiBody {String} name admin's name
 * @apiBody {String} password admin's personal password
 * @apiBody {String} id admin's id
 * @apiBody {String} email teacher's email
 *
 * @apiSuccess {Object} data admin object that just be created
 * @apiSuccess {String} data._id admin's object id
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
 * @apiUse InternalServerError
 */

export default async function ( req: Request, res: Response) {

  //Validate the fields in the request.body
  const schema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    id: Joi.string().required(),
  });

  //Run the validation check
  const validated = schema.validate(req.body, {
    abortEarly: false,
  });

  //Send error message as invalid inputs
  if (validated.error) {
    return res.status(422).json({
      error: validated.error.message,
      detail: validated.error.details,
    });
  }

  console.log('Create Admin');

  const newAdmin: Admin = req.body;

  try {
    const repo = RepositoryFactory('admin');
    const createdAdmin: Admin = await repo.create(newAdmin);

    return res.json({ data: createdAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}