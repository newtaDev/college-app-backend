import Joi from 'joi';

export const joiObject = <T>(
  schema?: Joi.PartialSchemaMap<T> | undefined | Joi.PartialSchemaMap<unknown>
) => Joi.object<T, false, unknown>(schema);
