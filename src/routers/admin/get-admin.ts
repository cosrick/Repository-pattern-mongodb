import { Request, Response } from 'express';
import Joi from 'joi';
import { Admin } from '../../models';
import { RepositoryFactory } from '../../repositories';

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

  console.log('Get Admin');

  const id: string = req.params.Id;

  try {
    const repo = RepositoryFactory('admin');
    const admin: Admin = await repo.findOne(id);

    return res.json({ data: admin });
  } catch (error) {
    if (!error) {
      return res.status(404).json({ message: 'User Not Found' });
    } else {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}