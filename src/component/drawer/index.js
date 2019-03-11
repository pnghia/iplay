import React, { useState, useEffect } from 'react'
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import http from 'service/http'
import { map } from 'ramda'
import { TransferWithinAStation, Payment, Gavel, PermIdentity, Notifications, SentimentDissatisfied } from '@material-ui/icons'
import useLoading from 'feature/loading/hook'

const topSidebar = [
  {
    title: 'Transfer',
    route: 'transfer',
    icon: <TransferWithinAStation />
  },
  {
    title: 'Topup',
    route: 'categories',
    icon: <Payment />
  },
  {
    title: 'Withdraw',
    route: 'withdraw',
    icon: <Gavel />
  }
]

const bottomSidebar = [
  {
    title: 'Setting',
    route: 'setting',
    icon: <Notifications />
  },
  {
    title: 'Profile',
    route: 'profile',
    icon: <PermIdentity />
  },
  {
    title: 'Logout',
    route: 'orders',
    icon: <SentimentDissatisfied />
  }
]

function sideList({ history }) {
  const [, withLoading] = useLoading(false);
  const [user, updateUser] = useState({})
  
  const fetchData = async () => {
    const { data } = await withLoading(() =>
      http.get({ path: 'api/authenticate' })
    );
    updateUser(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ), topSidebar)}
      </List>
      <Divider />
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ), bottomSidebar)}
      </List>
    </div>
  );
}

export default sideList;
