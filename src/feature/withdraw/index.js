/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { reduce } from 'ramda';
import {
  Button,
  TextField,
  CssBaseline,
  FormControl,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';

import Sidebar from 'component/drawer'
import Bottom from 'component/bottom'
import { withStyles } from '@material-ui/core/styles';
import { useForm, useField } from 'react-final-form-hooks';
import Joi from 'joi';
import http from 'service/http';
import { PropagateLoader } from 'react-spinners';
import store from 'store'
import { Menu, Close, Notifications } from '@material-ui/icons';
import styles from './style';
import useLoading from '../loading/hook';

function Withdraw({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const [drawer, toggleDrawer] = useState(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }
  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

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
      );
      setOpenSnackbar(true);
    } catch (error) {
      throw error
    }
  };

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

  const bankName = useField('bankName', form);
  const bankAccountName = useField('bankAccountName', form)
  const bankAccountNo = useField('bankAccountNo', form)
  const amount = useField('amount', form);

  function MySnackbarContentWrapper(props) {
    const { className, message, onClose, variant, ...other } = props;
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
    );
  }

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
            Withdraw
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
              <TextField {...bankName.input} label="Please Enter Bank Name (full)" fullWidth />
              {bankName.meta.touched && bankName.meta.error && (
                <div className={classes.error}>{bankName.meta.error}</div>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField {...bankAccountName.input} label="Please Enter Bank Account Name" fullWidth />
              {bankAccountName.meta.touched && bankAccountName.meta.error && (
                <div className={classes.error}>{bankAccountName.meta.error}</div>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField {...bankAccountNo.input} label="Please Enter Bank Account No" fullWidth />
              {bankAccountNo.meta.touched && bankAccountNo.meta.error && (
                <div className={classes.error}>{bankAccountNo.meta.error}</div>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField {...amount.input} label="Please Enter Withdraw Amount" fullWidth />
              {amount.meta.touched && amount.meta.error && (
                <div className={classes.error}>{amount.meta.error}</div>
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
  );
}

export default withStyles(styles)(Withdraw);
