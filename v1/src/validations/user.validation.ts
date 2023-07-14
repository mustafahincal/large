import Joi from "joi";

const customErrorMessages = {
  "string.base": "Please enter a text value.",
  "string.min": "{#label} must be at least {#limit} characters long.",
  "string.max": "{#label} must be at most {#limit} characters long.",
  "string.email": "Please enter a valid email address.",
  "array.base": "Please enter a valid array value.",
  "any.required": "{#label} is required.",
  "string.empty": "{#label} can not be empty.",
};

export default {
  login: Joi.object().keys({
    email: Joi.string()
      .email({ tlds: false })
      .required()
      .messages(customErrorMessages),
    password: Joi.string().required().messages(customErrorMessages),
  }),
  create: Joi.object().keys({
    first_name: Joi.string().required().messages(customErrorMessages),
    last_name: Joi.string().required().messages(customErrorMessages),
    email: Joi.string()
      .email({ tlds: false })
      .required()
      .messages(customErrorMessages),
    password: Joi.string().min(5).required().messages(customErrorMessages),
  }),
};
