/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { reduce } from 'ramda';
import {
  Button,
  TextField,
  CssBaseline,
  FormControl,
  Paper
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { useForm, useField } from 'react-final-form-hooks';
import Joi from 'joi';
import http from 'service/http';
import { PropagateLoader } from 'react-spinners';
import store from 'store'
import styles from './style';
import useLoading from '../loading/hook';

function Login({ classes, history }) {
  const [loading, withLoading] = useLoading(false);

  const onSubmit = async payload => {
    const { data: { id_token : token }} = await withLoading(() =>
      http.post({ path: 'authenticate', payload })
    );
    
    http.setJwtToken(token)
    store.set('token', token)
    history.push('home')
  };

  const schema = Joi.object().keys({
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    username: Joi.number()
      .required()
  });

  const validate = values => {
    return Joi.validate(values, schema, err => {
      if (!err) {
        return {};
      }
      const generateErr = (accumulator, { message, path: [name] }) => {
        return {
          ...accumulator,
          [name]: message
        };
      };
      const error = reduce(generateErr, {}, err.details);
      return error;
    });
  };

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate
  });

  const username = useField('username', form);
  const password = useField('password', form);

  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <img style={{width: 120}} src={`${process.env.PUBLIC_URL}/img/97pay-logo.png`} />
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <TextField {...username.input} label="Mobile No" fullWidth />
            {username.meta.touched && username.meta.error && (
              <div className={classes.error}>{username.meta.error}</div>
            )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField {...password.input} label="Password" type="password" fullWidth />
            {password.meta.touched && password.meta.error && (
              <div className={classes.error}>{password.meta.error}</div>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              className={classes.submit}
            >
              Sign in
            </Button>
          )}
        </form>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Login);
