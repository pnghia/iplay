/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import {
  AppBar,
  Button,
  CssBaseline,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  Toolbar,
  Typography
} from '@material-ui/core'

import Sidebar from 'component/drawer'
import Bottom from 'component/bottom'
import { withStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import Joi from 'joi'
import http from 'service/http'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import { Close as CloseIcon, Menu, Notifications } from '@material-ui/icons'
import validate from 'service/form/validation'
import formCreateInputs from 'service/form/create'
import TextInput from 'component/textInput'
import SelectInput from 'component/selectInput'
import styles from './style'
import useLoading from '../loading/hook'

function Deposit({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const [msgTrans, setMsgTrans] = useState('')
  const [drawer, toggleDrawer] = useState(false)
  const [openSnackbarError, setOpenSnackbarError] = React.useState(false)

  function handleCloseSnackbarError(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbarError(false)
  }

  const onToggleDrawer = status => () => {
    toggleDrawer(status)
  }

  const onSubmit = async payload => {
    try {
      const { user_id: userId } = store.get('user')
      const path = payload.transferType === 'in' ? `/users/${userId}/game/${payload.game}/deposit` : `/users/${userId}/game/${payload.game}/withdraw`
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
    game: Joi.string()
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

  const [transferType, game, amount] = formCreateInputs(['transferType', 'game', 'amount'], form)

  return (
    <div className={classes.root}>
      <Drawer open={drawer} onClose={onToggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer(false)}
          onKeyDown={onToggleDrawer(false)}
        >
          <Sidebar history={history} />
        </div>
      </Drawer>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={onToggleDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.header} style={{textAlign: 'center', fontWeight: 'bold'}}>
            Transfer
          </Typography>
          <div>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <CssBaseline />
          {/* <img style={{width: 120}} src={`${process.env.PUBLIC_URL}/img/97pay-logo.png`} /> */}
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <FormLabel component="legend">Transfer type</FormLabel>
              <RadioGroup
                aria-label="transfer"
                name="transfer"
                {...transferType.input}
              >
                <FormControlLabel value='in' control={<Radio color="primary" />} label="Transfer In" />
                <FormControlLabel value='out' control={<Radio color="primary" />} label="Transfer Out" />
              </RadioGroup>
          </FormControl>
          <SelectInput input={game} options={[{title: '918 Kiss', value: '2'}]} label='Select Game' />
          {/* <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="demo-controlled-open-select">Select Games</InputLabel>
              <Select
                open={openGameSelector}
                onClose={handleCloseGameSelector}
                onOpen={handleOpenGameSelector}
                {...game.input}
                inputProps={{
                  name: 'game',
                  id: 'demo-controlled-open-select',
                }}
              >
              <MenuItem value='2'>918 kiss</MenuItem>
            </Select>
            {game.meta.touched && game.meta.error && (
              <div className={classes.error}>{game.meta.error}</div>
            )}
          </FormControl> */}
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
