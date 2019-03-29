/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {
  Button,
  CssBaseline,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography
} from '@material-ui/core'
import validate from 'service/form/validation'
import formCreateInputs from 'service/form/create'
import TextInput from 'component/textInput'
import Bottom from 'component/bottom'
import { withStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import Joi from 'joi'
import http from 'service/http'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import Header from 'component/header'
import { Close } from '@material-ui/icons'
import styles from './style'
import useLoading from '../loading/hook'

function Withdraw({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const onSubmit = async payload => {
    try {
      const { user_id: userId, user_account_no: username } = store.get('user')
      const submited = {
        amount: payload.amount,
        bank_name: payload.bankName,
        bank_account_name: payload.bankAccountName,
        bank_account_number: payload.bankAccountNo,
        currency: 'MYR',
        payment_method: 'transaction',
        username
      }
      await withLoading(() =>
        http.post({ path: `users/${userId}/withdraw`, payload: submited })
      )
      setOpenSnackbar(true)
    } catch (error) {
      throw error
    }
  }

  const schema = Joi.object().keys({
    bankName: Joi.string()
      .label('Bank Name')
      .required(),
    bankAccountName: Joi.string()
      .label('Bank Account Name')
      .required(),
    bankAccountNo: Joi.string()
      .label('Bank Account Number')
      .required(),
    amount: Joi.number()
      .required()
  })

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate: validate(schema)
  })

  const [bankName, bankAccountName, bankAccountNo, amount] = formCreateInputs(['bankName', 'bankAccountName', 'bankAccountNo', 'amount'], form)
  
  function MySnackbarContentWrapper(props) {
    const { className, message, onClose, variant, ...other } = props
    return (
      <SnackbarContent
        style={{backgroundColor: '#007DFE'}}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <Close className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    )
  }

  return (
    <div className={classes.root}>
      <Header history={history} title='Withdraw'/>
      <div className={classes.container}>
        <CssBaseline />
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextInput input={bankName} label='Please Enter Bank Name (full)' />
            <TextInput input={bankAccountName} label='Please Enter Bank Account Name' />
            <TextInput input={bankAccountNo} label='Please Enter Bank Account No' />
            <TextInput input={amount} label='Please Enter Withdraw Amount' />
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
                <img alt='iplay' style={{width: 30, marginRight: 15}} src={`${process.env.PUBLIC_URL}/icon/icon-withdraw.svg`} />
                <Typography variant="button" color="inherit" className={classes.button}>
                  WITHDRAW NOW
                </Typography>
              </Button>
            )}
          </form>
        </div>
      <Bottom history={history} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          backgroundColor: '#007DFE'
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MySnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant="success"
          message="Your request submitted successfully"
        />
      </Snackbar>
    </div>
  )
}

export default withStyles(styles)(Withdraw)
