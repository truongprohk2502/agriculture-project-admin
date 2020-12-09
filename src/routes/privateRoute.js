import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps, null)(PrivateRoute);
