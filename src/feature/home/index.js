import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
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
import styles from './style';

function home({ history, classes }) {
  const [, withLoading] = useLoading(false);

  const [games, updateGames] = useState([]);
  const [drawer, toggleDrawer] = useState(false);

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  const fetchData = async () => {
    const [gameList, gameSynced ] = await withLoading(() => Promise.all([
      http.get({ path: 'games' }),
      http.post({ path: 'users/205/sync-game' })
    ]));

    const gamesInfo = gameSynced.map(item => {
      const found = gameList.find(({ id }) => id === item.game_id )
      return {
        ...item,
        name: found.name,
        game_ui_url: found.game_ui_url
      }
    })
    updateGames(gamesInfo)
  };

  useEffect(() => {
    fetchData();
  }, []);


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
      <div className={classes.container}>
        {
          map(({game_id: gameId, game_account: gameAccount, game_password: gamePassword, game_ui_url: download, name }) => (
            <Card className={classes.card} key={gameId}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  image={`${process.env.PUBLIC_URL}/img/home/${gameId}.png`}
                  title="Contemplative Reptile"
                />
                <CardContent style={{textAlign: 'center'}}>
                  <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 'bold'}}>
                    {name}
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
      <Bottom history={history} />
    </div>
  );
}
export default withStyles(styles)(home);
