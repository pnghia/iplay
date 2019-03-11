import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Badge,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card
} from '@material-ui/core'

import { Menu, GetApp, Notifications } from '@material-ui/icons'

import { map } from 'ramda'

import http from 'service/http'
import Sidebar from 'component/drawer'
import Bottom from 'component/bottom'
import useLoading from '../loading/hook'
import customStyle from './style'

const useStyles = makeStyles(customStyle);

function home({ history }) {
  const classes = useStyles();
  const [, withLoading] = useLoading(false);

  const [games, updateGames] = useState([
    {
      "id": 4,
      "user_id": 205,
      "game_id": 2,
      "game_account": "01157724955",
      "game_password": "12Aa!65tokkem",
      "download": "http://mega333.ddns.net:8080/v2/apk/mega333.apk"
    }
  ]);
  const [drawer, toggleDrawer] = useState(false);


  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  // const fetchData = async () => {
  //   const { data } = await withLoading(() =>
  //     http.get({ path: 'users/205/sync-game' })
  //   );
  //   updateGames(data)
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);


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
          <Typography variant="h6" color="inherit" className={classes.grow} style={{textAlign: 'center', fontWeight: 'bold'}}>
            97 IPAY
          </Typography>
          <div>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {
          map(({game_id: gameId, game_account: gameAccount, game_password: gamePassword, download }) => (
            <Card className={classes.card} key={gameId}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  image={`${process.env.PUBLIC_URL}/img/home/${gameId}.jpeg`}
                  title="Contemplative Reptile"
                />
                <CardContent style={{textAlign: 'center'}}>
                  <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 'bold'}}>
                    ACE 333
                  </Typography>
                  <Typography component="p">
                    <span style={{fontWeight: 'bold'}}>Username:</span> {gameAccount}
                  </Typography>
                  <Typography component="p">
                    <span style={{fontWeight: 'bold'}}>Password:</span> {gamePassword}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites" style={{marginLeft: 'auto'}}>
                  <GetApp />
                  <Typography component="label">
                    <a style={{textDecoration: 'none'}} href={download}>Click to Download Game</a>
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>
          ), games)
        }
      </div>
      <Bottom />
    </div>
  );
}

export default home;
