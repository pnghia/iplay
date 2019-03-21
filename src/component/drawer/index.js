/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import numeral from 'numeral'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import store from 'store'
import { map } from 'ramda'
import { AccountBalance, Gavel, Payment, PermIdentity, SentimentDissatisfied, TransferWithinAStation } from '@material-ui/icons'

const topSidebar = [
  {
    title: 'Transfer',
    route: 'transfer',
    icon: <TransferWithinAStation />
  },
  {
    title: 'Topup',
    route: 'deposit',
    icon: <Payment />
  },
  {
    title: 'Withdraw',
    route: 'withdraw',
    icon: <Gavel />
  }
]

const bottomSidebar = [
  {
    title: 'Change Password',
    route: 'change-password',
    icon: <PermIdentity />
  }
]

function sideList({ history }) {
  const { user_account_no: phone, user_money: balance, user_currency: currency } = store.get('user')

  return (
    <div style={{ textAlign: 'center' }}>
      <img style={{width: 120, marginTop: 25}} src={`${process.env.PUBLIC_URL}/img/97pay-logo.png`} />
      <List>
        <ListItem style={{color: '#007DFE'}}>
          <ListItemIcon>
            <PermIdentity />
          </ListItemIcon>
          <ListItemText primary={phone} />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary={`${numeral(balance).format('0,0')} ${currency}`} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ), topSidebar)}
      </List>
      <Divider />
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ), bottomSidebar)}
        <ListItem button onClick={() => { history.push('login'); store.clearAll()}}>
            <ListItemIcon>
              <SentimentDissatisfied />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
      </List>
    </div>
  )
}

export default sideList
