/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {
  Button,
  CssBaseline,
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
import styles from './style'
import useLoading from '../loading/hook'
import useDialog from '../modal/hook'

function Withdraw({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const [Dialog, showWithMessage] = useDialog({title: 'Withdraw'})

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
      showWithMessage('Your request submitted successfully')
    } catch (error) {
      showWithMessage('Something went wrong')
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
      {Dialog}
    </div>
  )
}

export default withStyles(styles)(Withdraw)
