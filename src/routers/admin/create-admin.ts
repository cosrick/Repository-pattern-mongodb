import { Request, Response } from 'express';
import Joi from 'joi';
import { Admin } from '../../models';
import { RepositoryFactory } from '../../repositories';

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