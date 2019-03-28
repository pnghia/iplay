/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import http from 'service/http'
import numeral from 'numeral'
import store from 'store'
import Bottom from 'component/bottom'
import Header from 'component/header'
import './style.css'

function Account({ history }) {
  const [user, updateUser] = useState({})

  const fetchAccount = async () => {
    const userResp = await http.get({ path: 'users/me'})
    store.set('user', userResp)
    updateUser(userResp)
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  const { fullname, user_money: balance, user_currency: currency, mobile_phone: phone } = user

  return (
    <section className="account_wrap">
      <Header history={history} title='Account' />
      <div className="profile_top">
        <img src="https://www.95asia.com/v2/img/peo.png" alt=""/>
        <span>{phone}</span>
      </div>
      <div className="mainwallet_box">
        <span className="pro_title">Hi, {fullname}</span>
        <span className="num wMain">Your Main Balance: {numeral(balance).format('0,0')} {currency}</span>
      </div>
      <div className="pro_wrap">
        <a className="pro_box" href="https://www.95asia.com/member/profile">
          <img src="https://www.95asia.com/v2/img/edit.png" alt=""/><br/>
          <span className="pro_title">Edit Profile</span>
        </a>
        <a className="pro_box" href="https://www.95asia.com/member/history">
          <img src="https://www.95asia.com/v2/img/history.png" alt=""/><br/>
          <span className="pro_title">History</span>
        </a>
        <a className="pro_box" onClick={() => history.push('deposit')}>
          <img src="https://www.95asia.com/v2/img/deposit.png" alt=""/><br/>
          <span className="pro_title">Deposit</span>
        </a>
        <a className="pro_box" onClick={() => history.push('withdraw')}>
          <img src="https://www.95asia.com/v2/img/withdraw.png" alt=""/><br/>
          <span className="pro_title">Withdraw</span>
        </a>
        <a className="pro_box" onClick={() => history.push('transfer')}>
          <img src="https://www.95asia.com/v2/img/transfer.png" alt=""/><br/>
          <span className="pro_title">Transfer</span>
        </a>
        <a className="pro_box" href="https://www.95asia.com/member/change-password">
          <img src="https://www.95asia.com/v2/img/change_pw.png" alt=""/><br/>
          <span className="pro_title">Change Password</span>
        </a>
      </div>
      <div className="clearfix" />
      <Bottom history={history} />
    </section>
  )
}

export default Account
