/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Login from 'feature/login';
import Home from 'feature/home';
import Cart from 'feature/cart'
import CartReview from 'feature/cartReview'
import './App.css';

// then our route config
const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/cart-review",
    component: CartReview
  }
];

const App = () => (
  <Router>
    <div>
      {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  </Router>
);


function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App;
