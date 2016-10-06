import React, { PropTypes as T } from 'react';
import { AuthService } from '../services';

const Login = ({ auth }) => (
  <div>
    <h2>Login</h2>
    <button onClick={auth.login}>Login</button>
  </div>
);
Login.propTypes = {
  auth: T.instanceOf(AuthService),
};

export default Login;
