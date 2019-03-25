import React from 'react'
import { FormControl, TextField } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffaf50'
    },
  },
  typography: { useNextVariants: true },
})

const styles = {
  input: {
    color: "#ffaf50"
  },
  label: {
    color: "#ffaf50"
  },
  underline: {
    "&:before": {
      borderBottom: `1px solid #ffaf50`
    }
  }
}

const Input = ({classes, input: { input, meta }, label, ...rest }) => (
  <FormControl margin="normal" required fullWidth>
    <MuiThemeProvider theme={theme}>
      <TextField {...input} label={label} {...rest} fullWidth InputProps={{
        classes: {underline: classes.underline},
        className: classes.input
      }} InputLabelProps={{className: classes.label}}/>
    </MuiThemeProvider>
    {meta.touched && meta.error && (
      <div style={{ color: '#dc3545', marginTop: 5 }}>{meta.error}</div>
    )}
  </FormControl>
)

export default withStyles(styles)(Input)