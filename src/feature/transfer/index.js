/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import {
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
} from '@material-ui/core'
import Bottom from 'component/bottom'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import Joi from 'joi'
import http from 'service/http'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import { Close as CloseIcon } from '@material-ui/icons'
import validate from 'service/form/validation'
import formCreateInputs from 'service/form/create'
import TextInput from 'component/textInput'
import SelectInput from 'component/selectInput'
import Header from 'component/header'
import styles from './style'
import useLoading from '../loading/hook'
import './style.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffaf50'
    },
  },
  typography: { useNextVariants: true },
})

function Deposit({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const [games, updateGames] = useState([])
  const [msgTrans, setMsgTrans] = useState('')
  const [openSnackbarError, setOpenSnackbarError] = React.useState(false)

  function handleCloseSnackbarError(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbarError(false)
  }

  const onSubmit = async payload => {
    try {
      const { user_id: userId } = store.get('user')
      const path = payload.transferType === 'in' ? `users/${userId}/game/${payload.game}/deposit` : `users/${userId}/game/${payload.game}/withdraw`
      const { statusCode, message } = await withLoading(() =>
        http.post({ path, payload: {
          amount: payload.amount
        } })
      )
      
      if(statusCode && statusCode !== 200) {
        setMsgTrans(message.length ? message : message.msg)
        setOpenSnackbarError(true)
        return
      }
      setMsgTrans('Transfer is successfully finished')
      setOpenSnackbarError(true)
    } catch (error) {
      setOpenSnackbarError(true)
    }
  }

  const schema = Joi.object().keys({
    transferType: Joi.string()
      .required(),
    game: Joi.number()
      .required(),
    amount: Joi.number()
      .min(50)
      .required()
  })

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate: validate(schema),
    initialValues: {
      transferType: 'in'
    }
  })

  const fetchData = async () => {
    const correctGameProps = ({ name, id: value }) => ({ title: name, value })
    const gamesResp = await http.get({ path: 'games' })
    updateGames(gamesResp.map(correctGameProps))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [transferType, game, amount] = formCreateInputs(['transferType', 'game', 'amount'], form)

  return (
    <div className={classes.root}>
      <Header history={history} title='Transfer'/>
      <div className={classes.container}>
        <CssBaseline />
          <form onSubmit={handleSubmit} className={classes.form}>
            <MuiThemeProvider theme={theme}>
              <FormControl margin="normal" required fullWidth>
                <FormLabel style={{color: '#ffaf50'}} component="legend">Transfer type</FormLabel>
                <RadioGroup
                  aria-label="transfer"
                  name="transfer"
                  {...transferType.input}
                >
                  <FormControlLabel value='in' control={<Radio color="primary" />} label="Transfer In" />
                  <FormControlLabel value='out' control={<Radio color="primary" />} label="Transfer Out" />
                </RadioGroup>
              </FormControl>
            </MuiThemeProvider>
          <SelectInput input={game} options={games} label='Select Game' />
          <TextInput input={amount} label='Please Enter amount' />
          {loading ? (
            <div
              style={{ display: 'flex', justifyContent: 'center', margin: 15 }}
            >
              <PropagateLoader
                sizeUnit="px"
                size={20}
                color="#f50057"
                loading={loading}
              />
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              className={classes.submit}
            >
              TRANSFER NOW
            </Button>
          )}
        </form>
      </div>
      <Bottom history={history} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarError}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{msgTrans}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleCloseSnackbarError}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  )
}

export default withStyles(styles)(Deposit)
