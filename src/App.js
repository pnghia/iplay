import React from "react"
import {
  Redirect,
  Route,
  BrowserRouter as Router
} from "react-router-dom"
import Login from 'feature/login'
import Home from 'feature/home'
import Deposit from 'feature/deposit'
import Withdraw from 'feature/withdraw'
import Transfer from 'feature/transfer'
import Register from 'feature/register'
import Account from 'feature/account'
import http from 'service/http'
import store from 'store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Source Sans Pro"',
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
        main: '#14805E'
      }
    }
  },
)

function AuthExample() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <PrivateRoute path="/deposit" component={Deposit} />
          <PrivateRoute path="/withdraw" component={Withdraw} />
          <PrivateRoute path="/transfer" component={Transfer} />
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/account" component={Account} />
        </div>
      </Router>
    </MuiThemeProvider>
  )
}

function PrivateRoute({ component: Component, ...rest }) {
  const token = store.get('token')
  http.setJwtToken(token)

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default AuthExample