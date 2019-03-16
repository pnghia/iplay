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
  FormLabel,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  RadioGroup,
  Radio,
  Snackbar
} from '@material-ui/core';

import Sidebar from 'component/drawer'
import Bottom from 'component/bottom'
import { withStyles } from '@material-ui/core/styles';
import { useForm, useField } from 'react-final-form-hooks';
import Joi from 'joi';
import http from 'service/http';
import { PropagateLoader } from 'react-spinners';
import store from 'store'
import { Menu, Close as CloseIcon } from '@material-ui/icons';
import styles from './style';
import useLoading from '../loading/hook';

function Deposit({ classes, history }) {
  const [loading, withLoading] = useLoading(false);
  const [openGameSelector, setOpenGameSelector] = useState(false);
  const [msgTrans, setMsgTrans] = useState('');
  const [drawer, toggleDrawer] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = React.useState(false);

  function handleCloseSnackbarError(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbarError(false);
  }

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

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
      setOpenSnackbarError(true);
    }
  };

  const schema = Joi.object().keys({
    transferType: Joi.string()
      .required(),
    game: Joi.string()
      .required(),
    amount: Joi.number()
      .min(50)
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
    validate,
    initialValues: {
      transferType: 'in'
    }
  });

  function handleCloseGameSelector() {
    setOpenGameSelector(false);
  }

  function handleOpenGameSelector() {
    setOpenGameSelector(true);
  }

  const transferType = useField('transferType', form);
  const game = useField('game', form);
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
            Transfer
          </Typography>
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
                <FormControlLabel value='in' control={<Radio />} label="Transfer In" />
                <FormControlLabel value='out' control={<Radio />} label="Transfer Out" />
              </RadioGroup>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
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
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField {...amount.input} label="Amount" fullWidth />
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
              SUBMIT
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
  );
}

export default withStyles(styles)(Deposit);
