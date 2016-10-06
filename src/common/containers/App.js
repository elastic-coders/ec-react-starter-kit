import React, { PureComponent, PropTypes as T } from 'react';
import { Link, locationShape } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import styles from './App.css';

import { fetchThings } from '../store/actions';

@connect(state => ({
  things: state.test.thingsFetched,
  loading: state.test.loading,
}), {
  onFetchThings: fetchThings,
  changePage: push,
})
export default class App extends PureComponent {
  static propTypes = {
    route: locationShape.isRequired,
    children: T.element.isRequired,
    things: T.string,
    loading: T.bool,
    onFetchThings: T.func,
    changePage: T.func,
  };

  logout = () => {
    // destroys the session data
    this.props.route.auth.logout();
    // redirects to login page
    this.props.changePage('/login');
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth, // sends auth instance from route to children
      });
    }

    return (
      <div>
        <h1 className={styles.title}>Hello, world!</h1>
        <ul>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/private">private</Link></li>
        </ul>
        <div>
          <button disabled={this.props.loading} onClick={() => this.props.onFetchThings('yes!')}>
            {this.props.loading ? 'LOADING' : 'FETCH THINGS'}
          </button>
          <span> Fetched things: {this.props.things}</span>
        </div>
        <div>
          {this.props.route && this.props.route.auth.loggedIn() && (
            <button onClick={this.logout}>Logout</button>
          )}
        </div>
        {children}
      </div>
    );
  }
}
