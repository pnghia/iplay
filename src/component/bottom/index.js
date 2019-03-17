import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Dashboard, Sync, Payment, Gavel } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    borderTop: '1px solid #ccc',
    backgroundColor: '#007DFE',
  },
});

function SimpleBottomNavigation({ history }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
      <BottomNavigationAction style={{color: 'white'}} value='home' label="Home" icon={<Dashboard />} />
      <BottomNavigationAction style={{color: 'white'}} value='transfer' label="Transfer" icon={<Sync/>} />
      <BottomNavigationAction style={{color: 'white'}} value='deposit' label="Topup" icon={<Payment />} />
      <BottomNavigationAction style={{color: 'white'}} value='withdraw' label="Withdraw" icon={<Gavel />} />
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;