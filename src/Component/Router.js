import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'Component/Navigation';
import Profile from '../routes/Profile';

const RouterApp = ({ isSignIn }) => {
  return (
    <Router>
      {isSignIn && <Navigation />}
      <Switch>
        {isSignIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default RouterApp;
