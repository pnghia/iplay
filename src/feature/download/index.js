import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@material-ui/core'
import store from 'store'
import { GetApp } from '@material-ui/icons'
import Header from 'component/header'
import { map } from 'ramda'

import http from 'service/http'
import Bottom from 'component/bottom'
import useLoading from '../loading/hook'
import styles from './style'

function home({ history, classes }) {
  const [, withLoading] = useLoading(false)

  const [games, updateGames] = useState([])

  const fetchData = async () => {
    const { user_id: userId } = store.get('user')
    const [gameList, gameSynced ] = await withLoading(() => Promise.all([
      http.get({ path: 'games' }),
      http.post({ path: `users/${userId}/sync-game` })
    ]))

    const gamesInfo = gameSynced.map(item => {
      const found = gameList.find(({ id }) => id === item.game_id )
      if (!found) {
        return item
      }
      return {
        ...item,
        name: found.name,
        download: found.game_ui_url,
        gameCode: found.game_code
      }
    })
    updateGames(gamesInfo)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className={classes.root}>
      <Header history={history} title='Download'/>
      <div className={classes.container}>
        {
          map(({game_id: gameId, game_account: gameAccount, game_password: gamePassword, download, name, game_sufix: gameSufix, gameCode }) => (
            <Card className={classes.card} key={gameId}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  image={`${process.env.PUBLIC_URL}/img/${gameCode}.png`}
                  title="Contemplative Reptile"
                />
                <CardContent style={{textAlign: 'center'}}>
                  <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 'bold', color: '#ffaf50'}}>
                    {name}
                  </Typography>
                  <Typography component="p">
                    <span style={{fontWeight: 'bold', color: '#ffaf50'}}>Username: {gameAccount + gameSufix}</span>
                  </Typography>
                  <Typography component="p">
                    <span style={{fontWeight: 'bold', color: '#ffaf50'}}>Password: {gamePassword}</span>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites" style={{marginLeft: 'auto'}}>
                  <GetApp style={{color: '#ffaf50'}} />
                  <Typography component="label">
                    <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: '#ffaf50'}} href={download}>Click to Download Game</a>
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>
          ), games)
        }
      </div>
      <Bottom history={history} />
    </div>
  )
}
export default withStyles(styles)(home)
