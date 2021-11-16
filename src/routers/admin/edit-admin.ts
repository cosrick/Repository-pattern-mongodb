import { Request, Response } from 'express';
import Joi from 'joi';
import { Admin } from '../../models';
import { RepositoryFactory } from '../../repositories';


export default async function ( req: Request, res: Response) {

  //Validate the fields in the req.params
  const paramsSchema: Joi.ObjectSchema = Joi.object({
    Id: Joi.string().required(),
  });

  //Run the validation check
  const paramsValidated = paramsSchema.validate(req.params, {
    abortEarly: false,
  });

  //Send error message as invalid inputs
  if (paramsValidated.error) {
    return res.status(422).json({
      error: paramsValidated.error.message,
      detail: paramsValidated.error.details,
    });
  }

  //Validate the fields in the req.body
  const bodySchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    id: Joi.string(),
  });

  //Run the validation check
  const bodyValidated = bodySchema.validate(req.body, {
    abortEarly: false,
  });

  //Send error message as invalid inputs
  if (bodyValidated.error) {
    return res.status(422).json({
      error: bodyValidated.error.message,
      detail: bodyValidated.error.details,
    });
  }

  console.log('Update Admin');

  const adminId = req.params.Id;
  const newAdmin: Partial<Admin> = req.body;

  try {
    const repo = RepositoryFactory('admin');
    const updatedAdmin: Admin = await repo.update(adminId, newAdmin);

    return res.json({ data: updatedAdmin });
  } catch (error) {
    if (!error) {
      return res.status(404).json({ message: 'User Not Found' });
    } else {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}