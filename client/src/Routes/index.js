import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppRoute from '../app-route';
import Navbar from '../screens/navbar/navbar';
import LandingPage from '../screens/pages/landing-page';
import RoomsPricing from '../screens/pages/rooms/rooms-pricing';
import SignIn from '../screens/pages/account/sign-in';
import SignUp from '../screens/pages/account/sing-up';

import Dashboard from '../dashboard';
import Content from '../dashboard/content';
import AddRoom from '../dashboard/add-room';
import AddCustomer from '../dashboard/add-customer';
import requireAuth from '../auth';

export default function Index() {
  return (
    <Router>
      <Switch>
        <AppRoute path="/" layout={Navbar} exact component={LandingPage} />
        <AppRoute
          path="/rooms&pricing"
          layout={Navbar}
          exact
          component={RoomsPricing}
        />
        <AppRoute path="/register" layout={Navbar} exact component={SignUp} />
        <AppRoute path="/login" layout={Navbar} exact component={SignIn} />
        <Dashboard>
          <Route path="/dashboard" exact component={Content} />
          <Route path="/addroom" exact component={AddRoom} />
          <Route path="/addcustomer" exact component={AddCustomer} />
        </Dashboard>
      </Switch>
    </Router>
  );
}
