import Joi from "joi";

const stringRequiredSchema = Joi.string().required();

export const createPetValidationObject = Joi.object({
  owner: stringRequiredSchema,
  name: stringRequiredSchema,
  type: stringRequiredSchema,
  bread: stringRequiredSchema,
  size: stringRequiredSchema,
});

export const updatePetValidationObject = Joi.object({
  id: Joi.string().allow("").optional(),
  owner: stringRequiredSchema,
  name: stringRequiredSchema,
  type: stringRequiredSchema,
  bread: stringRequiredSchema,
  size: stringRequiredSchema,
});
