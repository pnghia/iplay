import Joi from 'joi'
import { reduce } from 'ramda'

export default (schema) => values => Joi.validate(values, schema, err => {
  if (!err) {
    return {}
  }
  const generateErr = (accumulator, { message, path: [name] }) => {
    return {
      ...accumulator,
      [name]: message
    }
  }
  const error = reduce(generateErr, {}, err.details)
  return error
})