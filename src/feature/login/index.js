import React from 'react'
import {
  Button,
  CssBaseline
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import TextInput from 'component/textInput'
import Joi from 'joi'
import http from 'service/http'
import validate from 'service/form/validation'
import formCreateInputs from 'service/form/create'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import styles from './style'
import useLoading from '../loading/hook'
import useDialog from '../dialog/hook'

function Login({ classes, history, callback }) {
  const [loading, withLoading] = useLoading(false)
  const [ErrorDialog, showDialogErrorWithMessage] = useDialog({
    title: 'Login Error',
    btnLabel: 'Got it',
    type: 'error'
  })

  const onSubmit = async payload => {
    try {
      const { id_token: token, user } = await withLoading(() =>
        http.post({ path: 'authenticate', payload })
      )
      
      http.setJwtToken(token)
      store.set('token', token)
      store.set('user', user)
      history.push('home')
      if(callback) {
        callback()
      }
    } catch (error) {
      showDialogErrorWithMessage(error.message)
    }
  }

  const schema = Joi.object().keys({
    username: Joi.number()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  })

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate: validate(schema)
  })

  const [username, password] = formCreateInputs(['username', 'password'], form)

  return (
    <div className={classes.main}>
      <CssBaseline />
      <img style={{width: 120}} alt='iplay' src={`${process.env.PUBLIC_URL}/icon/97Pay-icon.png`} />
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput input={username} label='Enter Mobile No' />
        <TextInput input={password} type='password' label='Enter Password' />
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', margin: 15 }} >
            <PropagateLoader sizeUnit="px"  size={20} color="#f50057" loading={loading}
            />
          </div>
        ) : (
          <React.Fragment>
            <Button type="submit" fullWidth variant="contained" color="primary" disabled={submitting} className={classes.submit} >
              Sign in
            </Button>
            <Button onClick={() => history.push('register')} fullWidth variant="contained" color="primary" disabled={submitting} className={classes.submit}
            >
              Register
            </Button>
          </React.Fragment>
        )}
      </form>
      <ErrorDialog />
    </div>
  )
}

export default withStyles(styles)(Login)
