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
      console.log('mmatch ', this?.props?.profile?.role, 'super-admin');
      const { exp } = jwtDecode(token);

      if (Date.now() > exp) {
        return false;
      }
      if (this?.props?.admin) {
        if (
          this?.props?.profile?.role === 'admin' ||
          this?.props?.profile?.role === 'super-admin'
        ) {
          return true;
        } else {
          return 404;
        }
      }
      return true;
    }

    render() {
      const auth = this.checkAuth();

      if (!auth) {
        return <Redirect to="/login" />;
      } else if (auth === 404) {
        return <Redirect to="/unauthorized" />;
      } else {
        return <OriginalComponent {...this.props} />;
      }
    }
  };
};
