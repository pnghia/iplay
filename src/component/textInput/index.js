import React from 'react'
import { FormControl, TextField } from '@material-ui/core'

export default ({ input: { input, meta }, label, ...rest }) => (
  <FormControl margin="normal" required fullWidth>
    <TextField {...input} label={label} {...rest} fullWidth />
    {meta.touched && meta.error && (
      <div style={{ color: '#f50057' }}>{meta.error}</div>
    )}
  </FormControl>
)
