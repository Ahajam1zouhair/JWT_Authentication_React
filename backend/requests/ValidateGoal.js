import Joi from "joi";

export function ValidateCreateGoal(obj) {
  const schema = Joi.object({
    user: Joi.string().trim(),
    text: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

export function ValidateUpdateGoal(obj) {
  const schema = Joi.object({
    text: Joi.string().trim(),
  });
  return schema.validate(obj);
}
