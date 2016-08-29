import React, { PureComponent, PropTypes as T } from 'react'
import { AuthService } from '../services';

export default class Login extends PureComponent {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService),
  };

  render() {
    const { auth } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    );
  }
}
