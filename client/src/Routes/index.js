import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import AppRoute from "../AppRoute";
import Navbar from "../Components/Navbar/Navbar";
import LandingPage from "../Components/Pages/LandingPage";
import RoomsPricing from "../Components/Pages/RoomsPricing";

export default function Index() {
  return (
    <div>
      <Router>
        <Switch>
          <AppRoute
            path="/"
            layout={Navbar}
            exact
            component={LandingPage}
          ></AppRoute>

          <AppRoute
            path="/rooms&pricing"
            layout={Navbar}
            exact
            component={RoomsPricing}
          ></AppRoute>
        </Switch>
      </Router>
    </div>
  );
}
