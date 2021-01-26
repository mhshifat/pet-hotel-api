import Joi from "joi";

const stringRequiredSchema = Joi.string().required();
const emailRequiredSchema = Joi.string()
  .email({ tlds: { allow: ["com"] } })
  .required();

export const loginValidationObject = Joi.object({
  email: emailRequiredSchema,
  password: stringRequiredSchema,
});

export const tokenLoginValidationObject = Joi.object({
  token: stringRequiredSchema,
});

export const registerValidationObject = Joi.object({
  firstName: stringRequiredSchema,
  lastName: stringRequiredSchema,
  email: emailRequiredSchema,
  password: Joi.string().min(5).required(),
});
