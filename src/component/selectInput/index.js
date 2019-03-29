import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
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
  select: {
    "&:before": {
      borderColor: "#ffaf50"
    },
    label: {
      color: "#ffaf50"
    },
    color: "#ffaf50"
  },
  input: {
    '&:before': {
      borderColor: "#ffaf50",
    },
    '&:after': {
      borderColor: "#ffaf50",
    },
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

const Input = ({options, classes, input: { input, meta }, label, ...rest }) => {
  const [openGameSelector, setOpenGameSelector] = useState(false)
  function handleCloseGameSelector() {
    setOpenGameSelector(false)
  }

  function handleOpenGameSelector() {
    setOpenGameSelector(true)
  }

  return (
    <FormControl margin="normal" required fullWidth>
      <MuiThemeProvider theme={theme}>
        <InputLabel
          style={{ color: '#ffaf50' }}
          htmlFor="demo-controlled-open-select">{label}</InputLabel>
        <Select
          style={{ color: '#ffaf50', borderColor: '#ffaf50' }}
          className={classes.select}
          open={openGameSelector}
          onClose={handleCloseGameSelector}
          onOpen={handleOpenGameSelector}
          {...input}
          {...rest}
          inputProps={{
            classes: {underline: classes.underline},
            className: classes.input
          }}
          InputLabelProps={{className: classes.label}}
        >
          {options.map(({title, value}) => <MenuItem value={value}>{title}</MenuItem>)}
        </Select>
      </MuiThemeProvider>
      {meta.touched && meta.error && (
        <div style={{ color: '#dc3545', marginTop: 5 }}>{meta.error}</div>
      )}
    </FormControl>
  )
}

export default withStyles(styles)(Input)