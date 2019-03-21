import { map } from 'ramda'
import { useField } from 'react-final-form-hooks'

export default (inputs, form) => {
  const result = map(input => useField(input, form), inputs)
  return result
}