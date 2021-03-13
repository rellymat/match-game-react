import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/auth";

const ProtectedRoute = ({ path, component: Component, render, to, user, ...rest }) => {
  const currentUser = user ? auth.getCurrentUser() : !auth.getCurrentUser()
  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser)
          return (
            <Redirect
              to={{
                pathname: to,
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
