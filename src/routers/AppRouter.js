import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "../components/HomePage";
import CheckDuplicates from "../components/CheckDuplicates";
import TrailersContainer from "../components/TrailersContainer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/assignment1" component={CheckDuplicates} />
        <Route exact path="/assignment2" component={TrailersContainer} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
