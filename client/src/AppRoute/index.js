import React, { useState } from "react";
import { Route } from "react-router-dom";

export default function Index({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <div>
      <Layout></Layout>
      <Route
        {...rest}
        render={(props) => <Component {...props}></Component>}
      ></Route>
    </div>
  );
}
