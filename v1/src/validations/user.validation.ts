import Joi from "joi";

/* const customErrorMessages = {
      'string.base': 'Lütfen bir metin değeri girin.',
      'string.min': '{#label}, en az {#limit} karakter uzunluğunda olmalıdır.',
      'string.max': '{#label}, en fazla {#limit} karakter uzunluğunda olmalıdır.',
      'string.email': 'Lütfen geçerli bir e-posta adresi girin.',
      'array.base': 'Lütfen geçerli bir dizi değeri girin.',
      'any.required': '{#label}, zorunlu bir alandır.',
      'string.empty': '{#label} alanı boş olamaz.',
    }; */

export default {
  login: Joi.object().keys({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().required(),
  }),
  create: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().required(),
  }),
};
