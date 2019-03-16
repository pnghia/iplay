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
    borderTop: '1px solid #ccc'
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
      <BottomNavigationAction value='home' label="Home" icon={<Dashboard />} />
      <BottomNavigationAction value='transfer' label="Transfer" icon={<Sync/>} />
      <BottomNavigationAction value='deposit' label="Topup" icon={<Payment />} />
      <BottomNavigationAction value='withdraw' label="Withdraw" icon={<Gavel />} />
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;