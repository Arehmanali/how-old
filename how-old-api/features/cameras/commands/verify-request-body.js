const Joi = require('joi');

const schema = Joi.object().keys({
  url: Joi.string().uri().required(),
});

async function validateRegisterPayload(req, res, next) {
  let payloadValidation;
  try {
    payloadValidation = await Joi.validate(req.body, schema, { abortEarly: false });
  } catch (validateRegisterError) {
    payloadValidation = validateRegisterError;
  }
  const { details } = payloadValidation;
  let errors;
  if (details) {
    errors = {};
    details.forEach((errorDetail) => {
      const {
        message,
        path: [key],
      } = errorDetail;
      errors[key] = message;
    });
  }

  if (errors) {
    return res.status(400).send({ success: false, messages: { errors } });
  }
  return next();
}

module.exports = validateRegisterPayload;
