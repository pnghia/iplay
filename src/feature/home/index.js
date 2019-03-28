/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Carousel } from 'react-bootstrap'
import { Menu, Notifications } from '@material-ui/icons'
import { map } from 'ramda'
import Sidebar from 'component/drawer'
import Bottom from 'component/bottom'
import initialData from './constant'
import styles from './style'
import './style.css'

const slides = [
  {
    img: '1.jpg'
  }
]

const topControll = [
  {
    title: 'Sports',
    src: 'https://www.95asia.com/v2/img/sports.png'
  },
  {
    title: 'Live Casino',
    src: 'https://www.95asia.com/v2/img/lc.png'
  },
  {
    title: 'Slots',
    src: 'https://www.95asia.com/v2/img/slot.png'
  },
  {
    title: 'Lottery',
    src: 'https://www.95asia.com/v2/img/lot.png'
  },
  {
    title: 'Promotions',
    src: 'https://www.95asia.com/v2/img/promo.png'
  },
]

function home({ history, classes }) {

  const [drawer, toggleDrawer] = useState(false)

  const onToggleDrawer = status => () => {
    toggleDrawer(status)
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
            Home
          </Typography>
          <div>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Carousel className={classes.container}>
        {
          map(({ img }) => (
            <Carousel.Item key={img}>
              <img style={{width: '100%'}} alt='iplay' src={`${process.env.PUBLIC_URL}/img/slide/${img}`} />
            </Carousel.Item>
          ), slides)
        }
      </Carousel>
      <div className={classes.gridroot}>
        {topControll.map(({ src, title }) =>
          <div className={classes.gridList} cols={2.5}>
            <img style={{width: 40, height: 40}} src={src} alt='97ipay' />
            <p>{title}</p>
          </div>)
        }
      </div>
      {initialData.bodyContents.map(({ chils, title }) =>
        <div className={classes.bodyContentsRoot}>
          <React.Fragment>
            <div className={classes.bodyTitle}>
              {title}
            </div>
            <div className={classes.childroot}>
              {chils.map(({src, label}) => 
                <div className={classes.bodyList} cols={2.5}>
                  <img style={{width: '100%'}} src={src} alt='97ipay' />
                  <p>{label}</p>
                </div>
              )}
            </div>
          </React.Fragment>
        </div>
      )}
      <section className="contact_items">
        <div className="contact_name">Contact Us</div>
        <div className="itemsbox_group">
          <div className="contact_box">
            <a href="https://lc.chat/now/10147762/" target="_blank">
              <img src="https://www.95asia.com/v2/img/items/live.png" alt=""/><br/>
              <span>Live Chat</span>
            </a>
          </div>
          <div className="contact_box">
            <a href="#" data-toggle="modal" data-target="#qrcodeModal">
              <img src="https://www.95asia.com/v2/img/items/wechat.png" alt=""/><br/>
              <span>Wechat</span>
            </a>
          </div>
          <div className="contact_box">
            <a href="https://www.95asia.com/banking">
              <img src="https://www.95asia.com/v2/img/items/banking.png" alt=""/><br/>
              <span>Banking</span>
            </a>
          </div>
        </div>
      </section>
      <footer className={classes.footer}>
        <ul className={classes.footerContact}>
          <li><a href="https://97ipay.com/about-us">About Us</a></li>
          <li><a href="https://97ipay.com/responsible-gaming">Responsible Gaming</a></li>
          <li><a href="https://97ipay.com/banking">Banking</a></li>
          <li><a href="https://97ipay.com/terms-condition">Terms Of Use</a></li>
          <li><a href="https://97ipay.com/contact-us">Contact Us</a></li>
        </ul>
        <div className="btm_box">
          <p>Trusted Payment</p>
          <div className="btm_img_group">
            <img src="https://www.95asia.com/v2/img/bank1.jpg" alt=""/>
            <img src="https://www.95asia.com/v2/img/bank2.jpg" alt=""/>
            <img src="https://www.95asia.com/v2/img/bank3.jpg" alt=""/>
            <img src="https://www.95asia.com/v2/img/bank4.jpg" alt=""/>
            <img src="https://www.95asia.com/v2/img/bank5.jpg" alt=""/>
          </div>
          <div className="clearfix" />
        </div>
        <span className="copyright">
					© 2018 97 IPAY All rights reserved.
			  </span>
      </footer>
      <Bottom history={history} />
    </div>
  )
}
export default withStyles(styles)(home)
