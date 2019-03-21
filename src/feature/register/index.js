/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { reduce } from 'ramda'
import { withStyles } from '@material-ui/core/styles'
import { useField, useForm } from 'react-final-form-hooks'
import Joi from 'joi'
import http from 'service/http'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import {
  Button,
  CssBaseline,
  FormControl,
  TextField
} from '@material-ui/core'
import styles from './style'
import useLoading from '../loading/hook'

function Login({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const toLogin = () => history.push('login')
  const onSubmit = async ({ email, password, fullname, phone }) => {
    try {
      const payload = {
        email, password, fullname,
        mobile_phone: phone,
        user_account_no: phone
      }
      const { id_token: token, user } = await withLoading(() =>
        http.post({ path: 'users', payload })
      )
      
      http.setJwtToken(token)
      store.set('token', token)
      store.set('user', user)
      history.push('home')
    } catch (error) {
      throw error
    }
  }

  const schema = Joi.object().keys({
    fullname: Joi.string()
      .required(),
    phone: Joi.number()
      .required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  })

  const validate = values => {
    return Joi.validate(values, schema, err => {
      if (!err) {
        return {}
      }
      const generateErr = (accumulator, { message, path: [name] }) => {
        return {
          ...accumulator,
          [name]: message
        }
      }
      const error = reduce(generateErr, {}, err.details)
      return error
    })
  }

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate
  })

  const phone = useField('phone', form)
  const password = useField('password', form)
  const fullname = useField('fullname', form)
  const email = useField('email', form)
  const confirmPassword = useField('confirmPassword', form)

  return (
    <div className={classes.main}>
      <CssBaseline />
      <img style={{width: 120}} src={`${process.env.PUBLIC_URL}/img/97pay-logo.png`} />
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl margin="normal" required fullWidth>
          <TextField {...fullname.input} label="Enter Your Display Name" fullWidth />
          {fullname.meta.touched && fullname.meta.error && (
            <div className={classes.error}>{fullname.meta.error}</div>
          )}
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField {...phone.input} label="Enter Mobile No" fullWidth />
          {phone.meta.touched && phone.meta.error && (
            <div className={classes.error}>{phone.meta.error}</div>
          )}
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField {...email.input} label="Enter Your Primary Email" fullWidth />
          {email.meta.touched && email.meta.error && (
            <div className={classes.error}>{email.meta.error}</div>
          )}
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField {...password.input} label="Enter Your Password" type="password" fullWidth />
          {password.meta.touched && password.meta.error && (
            <div className={classes.error}>{password.meta.error}</div>
          )}
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField {...confirmPassword.input} label="Retype Your Password" type="password" fullWidth />
          {confirmPassword.meta.touched && confirmPassword.meta.error && (
            <div className={classes.error}>{confirmPassword.meta.error}</div>
          )}
        </FormControl>
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
    </div>
  )
}

export default withStyles(styles)(Login)
