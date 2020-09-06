import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

export default (OriginalComponent) => {
  return class MixedComponent extends Component {
    checkAuth() {
      const token = this.props.token;
      if (!token) {
        return false;
      }

      const { exp } = jwtDecode(token);

      if (Date.now() > exp) {
        return false;
      }

      return true;
    }

    render() {
      const auth = this.checkAuth();

      if (!auth) {
        return <Redirect to="/login" />;
      } else {
        return <OriginalComponent {...this.props} />;
      }
    }
  };
};
