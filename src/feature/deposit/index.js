import React, { useRef, useState } from 'react'
import {
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel
} from '@material-ui/core'
import Header from 'component/header'
import Bottom from 'component/bottom'
import { withStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import validate from 'service/form/validation'
import formCreateInputs from 'service/form/create'
import TextInput from 'component/textInput'
import SelectInput from 'component/selectInput'
import Joi from 'joi'
import http from 'service/http'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import styles from './style'
import useLoading from '../loading/hook'
import './style.css'

const avaiableBanking = [{
  title: 'CIMB Bank',
  value: 'CIMB'
},
{
  title: 'Hong Leong Bank',
  value: 'HLB'
},
{
  title: 'Maybank Berhad',
  value: 'MBB'
},
{
  title: 'Public Bank',
  value: 'PBB'
},
{
  title: 'RHB',
  value: 'RHB'
}]

function Deposit({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const formPayment = useRef(null)

  const [backendUrl, setBackendUrl]  = useState()
  const [currency, setCurrency] = useState()
  const [memberId, setMemberId] = useState()
  const [memberIp, setMemberIp] = useState()
  const [partnerCode, setPartnerCode] = useState()
  const [partnerOrderid, setPartnerOrderid] = useState()
  const [redirectUrl, setRedirectUrl] = useState()
  const [serviceVersion, setServiceVersion] = useState()
  const [sign, setSign] = useState()
  const [transTime, setTransTime] = useState()

  const onSubmit = async ({ bankCode, amount }) => {
    try {
      const { user_id: userId } = store.get('user')
      const payload = await withLoading(() =>
        http.get({ path: `api/payment/${userId}/sign?bankCode=${bankCode}&amount=${amount}` })
      )
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
      formPayment.current.submit()
    } catch (error) {
      throw error
    }
  }

  const schema = Joi.object().keys({
    bankCode: Joi.string()
      .required(),
    amount: Joi.number()
      .required()
  })

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate: validate(schema)
  })

  const [bankCode, amount] = formCreateInputs(['bankCode', 'amount'], form)

  return (
    <div className={classes.root}>
      <Header history={history} title='Top up'/>
      <div className={classes.container}>
        <CssBaseline />
          <form onSubmit={handleSubmit} className={classes.form}>
            <SelectInput input={bankCode} options={avaiableBanking} label='Select bank' />
            <TextInput input={amount} label='Please Enter amount' />
          <FormControlLabel
            control={<Checkbox style={{color: '#ffaf50'}} value="remember" color="primary" />}
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
        <input type="text" {...amount.input} value={amount.input.value * 100} name="amount" />
        <input type="text" value={backendUrl} name="backend_url" />
        <input type="text" {...bankCode.input} name="bank_code" />
        <input type="text" value={currency} name="currency" />
        <input type="text" value={memberId} name="member_id" />
        <input type="text" value={memberIp} name="member_ip" />
        <input type="text" value={partnerCode} name="partner_code"/>
        <input type="text" value={partnerOrderid} name="partner_orderid"/>
        <input type="text" value={redirectUrl} name="redirect_url"/>
        <input type="text" value={serviceVersion} name="service_version" />
        <input type="text" value={sign} name="sign" />
        <input type="text" value={transTime} name="trans_time" />
      </form>
    </div>
  )
}

export default withStyles(styles)(Deposit)
