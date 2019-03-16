/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { reduce } from 'ramda';
import {
  Button,
  TextField,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from '@material-ui/core';

import Sidebar from 'component/drawer'
import Bottom from 'component/bottom'
import { withStyles } from '@material-ui/core/styles';
import { useForm, useField } from 'react-final-form-hooks';
import Joi from 'joi';
import http from 'service/http';
import { PropagateLoader } from 'react-spinners';
import store from 'store'
import { Menu } from '@material-ui/icons';
import styles from './style';
import useLoading from '../loading/hook';

function Deposit({ classes, history }) {
  const [loading, withLoading] = useLoading(false);
  const [open, setOpen] = React.useState(false);
  const [drawer, toggleDrawer] = useState(false);

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  const onSubmit = async payload => {
    try {
      const { user_id: userId } = store.get('user')
      await withLoading(() =>
        http.post({ path: `users/${userId}/deposit`, payload })
      );
    } catch (error) {
      throw error
    }
  };

  const schema = Joi.object().keys({
    bank: Joi.string()
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

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  const bank = useField('bank', form);
  const amount = useField('amount', form);

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
          <Typography variant="body1" color="inherit" className={classes.grow} style={{textAlign: 'center', fontWeight: 'bold'}}>
            Top up
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <CssBaseline />
          {/* <img style={{width: 120}} src={`${process.env.PUBLIC_URL}/img/97pay-logo.png`} /> */}
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="demo-controlled-open-select">Select bank</InputLabel>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                {...bank.input}
                inputProps={{
                  name: 'bank',
                  id: 'demo-controlled-open-select',
                }}
              >
              <MenuItem value='CIMB'>CIMB Bank</MenuItem>
              <MenuItem value='HLB'>Hong Leong Bank</MenuItem>
              <MenuItem value='MBB'>Maybank Berhad</MenuItem>
              <MenuItem value='PBB'>Public Bank</MenuItem>
              <MenuItem value='RHB'>RHB</MenuItem>
            </Select>
            {bank.meta.touched && bank.meta.error && (
              <div className={classes.error}>{bank.meta.error}</div>
            )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField {...amount.input} label="Amount" fullWidth />
            {amount.meta.touched && amount.meta.error && (
              <div className={classes.error}>{amount.meta.error}</div>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="I agree to terms and conditions"
          />
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
              SUBMIT
            </Button>
          )}
        </form>
      </div>
      <Bottom history={history} />
    </div>
  );
}

export default withStyles(styles)(Deposit);
