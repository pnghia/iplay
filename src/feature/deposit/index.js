/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from 'react';
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
import { Menu, Notifications } from '@material-ui/icons';
import styles from './style';
import useLoading from '../loading/hook';

function Deposit({ classes, history }) {
  const [loading, withLoading] = useLoading(false);
  const [open, setOpen] = React.useState(false);
  const [drawer, toggleDrawer] = useState(false);
  const formPayment = useRef(null);
  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  const [backendUrl, setBackendUrl]  = useState()
  const [currency, setCurrency] = useState();
  const [memberId, setMemberId] = useState();
  const [memberIp, setMemberIp] = useState();
  const [partnerCode, setPartnerCode] = useState();
  const [partnerOrderid, setPartnerOrderid] = useState();
  const [redirectUrl, setRedirectUrl] = useState();
  const [serviceVersion, setServiceVersion] = useState();
  const [sign, setSign] = useState();
  const [transTime, setTransTime] = useState();

  const onSubmit = async ({ bankCode, amount }) => {
    try {
      const { user_id: userId } = store.get('user')
      const payload = await withLoading(() =>
        http.get({ path: `api/payment/${userId}/sign?bankCode=${bankCode}&amount=${amount}` })
      );
      setBackendUrl(payload.backend_url)
      setCurrency(payload.currency)
      setMemberId(payload.member_id)
      setMemberIp(payload.member_ip)
      setPartnerCode(payload.partner_code)
      setPartnerOrderid(payload.partner_orderid)
      setRedirectUrl(payload.redirect_url)
      setServiceVersion(payload.service_version)
      setSign(payload.sign)
      setTransTime(payload.trans_time)
      formPayment.current.submit();
    } catch (error) {
      throw error
    }
  };

  const schema = Joi.object().keys({
    bankCode: Joi.string()
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

  const bankCode = useField('bankCode', form);
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
          <Typography variant="title" color="inherit" className={classes.header} style={{textAlign: 'center', fontWeight: 'bold'}}>
            Top up
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
              <InputLabel htmlFor="demo-controlled-open-select">Select bank</InputLabel>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                {...bankCode.input}
                inputProps={{
                  name: 'bankCode',
                  id: 'demo-controlled-open-select',
                }}
              >
              <MenuItem value='CIMB'>CIMB Bank</MenuItem>
              <MenuItem value='HLB'>Hong Leong Bank</MenuItem>
              <MenuItem value='MBB'>Maybank Berhad</MenuItem>
              <MenuItem value='PBB'>Public Bank</MenuItem>
              <MenuItem value='RHB'>RHB</MenuItem>
            </Select>
            {bankCode.meta.touched && bankCode.meta.error && (
              <div className={classes.error}>{bankCode.meta.error}</div>
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
            >TOP UP NOW
            </Button>
          )}
        </form>
      </div>
      <Bottom history={history} />
      <form style={{display: 'none'}} action='https://www.gzshop318.com/fundtransfer.php' ref={formPayment} method='POST'>
        <input type="text" {...amount.input} name="amount" />
        <input type="text" value={backendUrl} name="backend_url" />
        <input type="text" {...bankCode.input} name="bank_code" />
        <input type="text" value={currency} name="currency" />
        <input type="text" value={memberId} name="member_id" />
        <input type="text" value={memberIp} name="member_ip" />
        <input type="text" value={partnerCode} name="partner_code"/>
        <input type="text" value={partnerOrderid} name="partner_orderid"/>
        <input type="text" value={redirectUrl} name="redirect_url"/>
        <input type="text" name="remark" value="" />
        <input type="text" value={serviceVersion} name="service_version" />
        <input type="text" value={sign} name="sign" />
        <input type="text" value={transTime} name="trans_time" />
      </form>
    </div>
  );
}

export default withStyles(styles)(Deposit);
