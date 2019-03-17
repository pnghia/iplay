import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom"
import Login from 'feature/login'
import Home from 'feature/home'
import Deposit from 'feature/deposit'
import Withdraw from 'feature/withdraw'
import Transfer from 'feature/transfer'
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
        main: '#007DFE'
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
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/deposit" component={Deposit} />
          <PrivateRoute path="/withdraw" component={Withdraw} />
          <PrivateRoute path="/transfer" component={Transfer} />
          <PrivateRoute exact path="/" component={Home} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
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
  );
}

export default AuthExample;