import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AppRoute from '../AppRoute';
import Navbar from '../Components/Navbar/Navbar';
import LandingPage from '../Components/Pages/LandingPage';
import RoomsPricing from '../Components/Pages/Rooms/RoomsPricing';
import SignIn from '../Components/Pages/SignIn/sign-in';

export default function Index() {
  return (
    <div>
      <Router>
        <Switch>
          <AppRoute path="/" layout={Navbar} exact component={LandingPage} />
          <AppRoute
            path="/rooms&pricing"
            layout={Navbar}
            exact
            component={RoomsPricing}
          />
          <AppRoute path="/register" layout={Navbar} exact component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}
