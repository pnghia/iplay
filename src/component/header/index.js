/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import store from 'store'
import { Menu } from '@material-ui/icons'
import Sidebar from 'component/drawer'
import Login from 'feature/login'
import './style.css'

function Header({ history, title }) {
  const user = store.get('user')
  const token = store.get('token')
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const onToggleDrawer = (side, open) => () => {
    setState({ ...state, [side]: open })
  }

  return (
    <div className='header'>
      <Drawer open={state.left} onClose={onToggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer('left', false)}
          onKeyDown={onToggleDrawer('left', false)}
        >
          <Sidebar history={history} />
        </div>
      </Drawer>
      <Drawer anchor="right" open={state.right} onClose={onToggleDrawer('right', false)}>
        <div
          tabIndex={0}
          role="button"
          style={{width: 300, background: `url(${process.env.PUBLIC_URL}/img/pages_bg.jpg) top center no-repeat`, height: '100vh'}}
        >
          <Login history={history} callback={onToggleDrawer('right', false)}/>
        </div>
      </Drawer>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={onToggleDrawer('left', true)}
            className='menu-button'
            color="inherit"
            aria-label="Menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="title" color="inherit" className='title-header' style={{textAlign: 'center', fontWeight: 'bold'}}>
            {title}
          </Typography>
          <div>
            <IconButton color="inherit" onClick={!user || !token ? onToggleDrawer('right', true) : () => history.push('account')}>
              <img style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/login.png`} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Header
