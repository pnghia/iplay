/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import numeral from 'numeral'
import {
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

import store from 'store'
import { map } from 'ramda'


const topSidebar = [
  {
    title: 'Transfer',
    route: 'transfer',
    icon: <img style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-transfer.svg`} />
  },
  {
    title: 'Topup',
    route: 'deposit',
    icon: <img style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-receive.svg`} />
  },
  {
    title: 'Withdraw',
    route: 'withdraw',
    icon: <img style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-transfer.svg`} />
  }
]

const bottomSidebar = [
  {
    title: 'Change Password',
    route: 'change-password',
    icon: <img style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-profile.svg`} />
  }
]

function sideList({ history }) {
  const { fullname, user_money: balance, user_currency: currency } = store.get('user')

  return (
    <div style={{ textAlign: 'center' }}>
      <img style={{width: 120, marginTop: 25}} src={`${process.env.PUBLIC_URL}/img/97pay-logo.png`} />
      <List>
        <ListItem style={{color: '#007DFE'}}>
          <img style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-profile.svg`} />
          <ListItemText primary={`Hi, ${fullname}`} />
        </ListItem>
        <ListItem button >
          <ListItemText primary={`Your Cash:  ${numeral(balance).format('0,0')} ${currency}`} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            {icon}
            <ListItemText primary={title} />
          </ListItem>
        ), topSidebar)}
      </List>
      <Divider />
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            {icon}
            <ListItemText primary={title} />
          </ListItem>
        ), bottomSidebar)}
        <ListItem button onClick={() => { history.push('login'); store.clearAll()}}>
            <img style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-logout.svg`} />
            <ListItemText primary='Logout' />
          </ListItem>
      </List>
    </div>
  )
}

export default sideList
