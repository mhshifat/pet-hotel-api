import Joi from "joi";

const stringRequiredSchema = Joi.string().required();
const emailRequiredSchema = Joi.string()
  .email({ tlds: { allow: ["com"] } })
  .required();

export const createUserValidationObject = Joi.object({
  firstName: stringRequiredSchema,
  lastName: stringRequiredSchema,
  email: emailRequiredSchema,
  phoneNumber: Joi.string().allow("").optional(),
  avatar: Joi.string().allow("").optional(),
  role: Joi.string().required(),
  password: Joi.string().min(5).required(),
});

export const updateUserValidationObject = Joi.object({
  id: Joi.string().allow("").optional(),
  firstName: stringRequiredSchema,
  lastName: stringRequiredSchema,
  email: emailRequiredSchema,
  phoneNumber: Joi.string().allow("").optional(),
  avatar: Joi.string().allow("").optional(),
  role: Joi.string().required(),
});
