import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom"
import Login from 'feature/login'
import Home from 'feature/home'
import http from 'service/http'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
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
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        http.token ? (
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