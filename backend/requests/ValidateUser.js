import Joi from "joi";

export function ValidateCreateUser(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

export function ValidateUpdateUser(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3),
    email: Joi.string().trim().email(),
    password: Joi.string().trim(),
  });
  return schema.validate(obj);
}

export function ValidateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}
