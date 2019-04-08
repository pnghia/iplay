/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import Joi from 'joi'
import http from 'service/http'
import validate from 'service/form/validation'
import formCreateInputs from 'service/form/create'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import TextInput from 'component/textInput'
import {
  Button,
  CssBaseline
} from '@material-ui/core'
import styles from './style'
import useLoading from '../loading/hook'
import useDialog from '../dialog/hook'

function Login({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const [ErrorDialog, showDialogErrorWithMessage] = useDialog({
    title: 'Register Error',
    btnLabel: 'Got it',
    type: 'error'
  })
  const toLogin = () => history.push('login')
  const onSubmit = async ({ email, password, fullname, phone, agent = '' }) => {
    try {
      const payload = {
        email, password, fullname,
        mobile_phone: phone,
        user_account_no: phone,
        parent_id: agent === '' ? undefined : agent
      }
      const { id_token: token, user } = await withLoading(() =>
        http.post({ path: 'users', payload })
      )
      
      http.setJwtToken(token)
      store.set('token', token)
      store.set('user', user)
      history.push('home')
    } catch (error) {
      showDialogErrorWithMessage(error.message)
    }
  }

  const schema = Joi.object().keys({
    fullname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    agent: Joi.string().email({ minDomainAtoms: 2 })
  })

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate: validate(schema)
  })

  const [phone, password, fullname, email, confirmPassword, agent] = formCreateInputs(['phone', 'password', 'fullname', 'email', 'confirmPassword', 'agent'], form)
  return (
    <div className={classes.main}>
      <CssBaseline />
      <img style={{width: 120}} alt='iplay' src={`${process.env.PUBLIC_URL}/icon/97Pay-icon.png`} />
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput input={fullname} label='Enter Your Display Name' />
        <TextInput input={phone} label='Enter Mobile No' />
        <TextInput input={email} label='Enter Your Primary Email' />
        <TextInput input={agent} label='Enter Your Agent email (optional)' />
        <TextInput input={password} type="password" label='Enter Your Password' />
        <TextInput input={confirmPassword} type="password" label='Retype Your Password' />
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
          <React.Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              className={classes.submit}
            >
              REGISTER
            </Button>
            <Button
              onClick={toLogin}
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              className={classes.submit}
            >
              BACK TO LOGIN
            </Button>
          </React.Fragment>
        )}
      </form>
      <ErrorDialog/>
    </div>
  )
}

export default withStyles(styles)(Login)
