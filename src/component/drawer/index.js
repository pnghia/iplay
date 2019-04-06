/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {
  Divider,
  List,
  ListItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import store from 'store'
import { map } from 'ramda'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    background: '#076045',
    width: 100
  },
})

const topSidebar = [
  {
    title: 'Home',
    route: '/',
    icon: <img style={{width: 40}} src={`${process.env.PUBLIC_URL}/icon/icon-home.svg`} />
  },
  {
    title: 'Account',
    route: '/account',
    icon: <img style={{width: 40}} src={`${process.env.PUBLIC_URL}/icon/login.png`} />
  },
  {
    title: 'Histories',
    route: 'histories',
    icon: <img style={{width: 40}} src={`${process.env.PUBLIC_URL}/icon/icon-history.svg`} />
  },
  {
    title: 'Topup',
    route: 'deposit',
    icon: <img style={{width: 40}} src={`${process.env.PUBLIC_URL}/icon/icon-receive.svg`} />
  },
  {
    title: 'Withdraw',
    route: 'withdraw',
    icon: <img style={{width: 40}} src={`${process.env.PUBLIC_URL}/icon/icon-transfer.svg`} />
  },
  {
    title: 'Live Casino',
    route: 'change-password',
    icon: <img style={{width: 40}} src="https://www.95asia.com/v2/img/sidemenu/lc.png" />
  },
  {
    title: 'Slots',
    route: 'change-password',
    icon: <img style={{width: 40}} src="https://www.95asia.com/v2/img/sidemenu/slot.png" />
  },
  {
    title: 'Lottery',
    route: 'change-password',
    icon: <img style={{width: 40}} src="https://www.95asia.com/v2/img/sidemenu/lottery.png" />
  },
  {
    title: 'Download',
    route: 'download',
    icon: <img style={{width: 40}} src={`${process.env.PUBLIC_URL}/icon/icon-download.png`} />
  }
]

function sideList({ history }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List>
        {map(({ title, route, icon }) => (
          <React.Fragment key={title}>
            <ListItem button key={title} onClick={() => history.push(route)}>
              <div style={{textAlign: 'center', width: '100%'}}>
                {icon}
                <span style={{color: '#fff', display: 'block'}}>{title}</span>
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        ), topSidebar)}
        <ListItem button onClick={() => { history.push('/'); store.clearAll()}}>
          <div style={{textAlign: 'center', width: '100%'}}>
            <img style={{width: 40}} src={`${process.env.PUBLIC_URL}/icon/icon-logout.svg`} />
            <span style={{color: '#fff', display: 'block', fontSize: 12}}>Logout</span>
          </div>
        </ListItem>
      </List>
    </div>
  )
}

export default sideList
