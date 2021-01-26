import Joi from "joi";

const stringRequiredSchema = Joi.string().required();

export const createBookingValidationObject = Joi.object({
  owner: stringRequiredSchema,
  pet: stringRequiredSchema,
  arrival: stringRequiredSchema,
  departure: stringRequiredSchema,
  notes: Joi.string().optional().allow(""),
  employeeNotes: Joi.string().optional().allow(""),
  cancellationNotes: Joi.string().optional().allow(""),
  images: Joi.array().items(Joi.string()),
});

export const updateBookingValidationObject = Joi.object({
  id: Joi.string().allow("").optional(),
  status: Joi.string().optional().allow(""),
  notes: Joi.string().optional().allow(""),
  employeeNotes: Joi.string().optional().allow(""),
  cancellationNotes: Joi.string().optional().allow(""),
  images: Joi.array().items(Joi.string()),
});
