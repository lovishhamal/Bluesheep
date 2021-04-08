import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppRoute from '../app-route';
import Navbar from '../screens/navbar/navbar';
import LandingPage from '../screens/pages/landing-page';
import RoomsPricing from '../screens/pages/rooms';
import SignIn from '../screens/pages/account/sign-in';
import SignUp from '../screens/pages/account/sing-up';
import RoomDetail from '../screens/pages/details/details';
import MyBooking from '../screens/pages/mybooking/mybooking';
import MyOrder from '../screens/pages/order/order';
import Culinary from '../screens/pages/culinary/culinary';
import Food from '../dashboard/food';
import OurService from '../screens/pages/ourservices/ourservice';
import About from '../screens/pages/about/about';
import NotFound from '../utils/path/404';
import requireAuth from '../auth';

import Dashboard from '../dashboard';
import Content from '../dashboard/content';
import AddRoom from '../dashboard/add-room';
import AddCustomer from '../dashboard/add-customer';
import AllCustomers from '../dashboard/customers';
import AllRooms from '../dashboard/rooms';
import AddFood from '../dashboard/add-food';
import DashboardNavbar from '../dashboard/header';

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
        <AppRoute
          path="/roomdetail/:id"
          layout={Navbar}
          exact
          component={RoomDetail}
        />
        <AppRoute path="/culinary" layout={Navbar} exact component={Culinary} />
        <AppRoute
          path="/services"
          layout={Navbar}
          exact
          component={OurService}
        />
        <AppRoute
          path="/mybooking"
          layout={Navbar}
          exact
          component={requireAuth(MyBooking)}
        />
        <AppRoute
          path="/myorder"
          layout={Navbar}
          exact
          component={requireAuth(MyOrder)}
        />
        <AppRoute
          path="/about"
          layout={Navbar}
          exact
          component={requireAuth(About)}
        />
        <Dashboard
          layout={requireAuth(DashboardNavbar)}
          path="/dashboard"
          exact
          component={Content}
        />
        <Dashboard
          layout={DashboardNavbar}
          path="/addroom/:id"
          exact
          component={requireAuth(AddRoom)}
        />
        <Dashboard
          layout={DashboardNavbar}
          path="/addcustomer"
          exact
          component={requireAuth(AddCustomer)}
        />
        <Dashboard
          layout={DashboardNavbar}
          path="/allcustomers"
          exact
          component={requireAuth(AllCustomers)}
        />
        <Dashboard
          layout={DashboardNavbar}
          path="/allrooms"
          exact
          component={requireAuth(AllRooms)}
        />
        <Dashboard
          layout={DashboardNavbar}
          path="/foods"
          exact
          component={requireAuth(Food)}
        />
        <Dashboard
          layout={DashboardNavbar}
          path="/addfood/:id"
          exact
          component={requireAuth(AddFood)}
        />
        <AppRoute layout={Navbar} exact component={NotFound} />
      </Switch>
    </Router>
  );
}
