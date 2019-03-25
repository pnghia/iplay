import React from 'react'
import { makeStyles } from '@material-ui/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    borderTop: '1px solid #ccc'
  },
})

function SimpleBottomNavigation({ history }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
        history.push(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{color: 'rgba(0, 0, 0, 0.87)'}} value='home' label="Home" icon={<img alt='iplay' style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-home.svg`} />} />
      <BottomNavigationAction style={{color: 'rgba(0, 0, 0, 0.87)'}} value='transfer' label="Transfer" icon={<img alt='iplay' style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-transfer.svg`} />} />
      <BottomNavigationAction style={{color: 'rgba(0, 0, 0, 0.87)'}} value='deposit' label="Topup" icon={<img alt='iplay' style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-receive.svg`} />} />
      <BottomNavigationAction style={{color: 'rgba(0, 0, 0, 0.87)'}} value='withdraw' label="Withdraw" icon={<img alt='iplay' style={{width: 30}} src={`${process.env.PUBLIC_URL}/icon/icon-withdraw.svg`} />} />
    </BottomNavigation>
  )
}

export default SimpleBottomNavigation