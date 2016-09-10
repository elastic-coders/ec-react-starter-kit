import React, { PureComponent, PropTypes as T } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import styles from './App.css';

import { fetchThings } from '../store/actions';

@connect(state => ({
  things: state.test.thingsFetched,
}), {
  onFetchThings: fetchThings,
  changePage: push,
})
export default class App extends PureComponent {
  static propTypes = {
    things: T.string,
    onFetchThings: T.func,
    changePage: T.func,
  };

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth // sends auth instance from route to children
      })
    }

    return (
      <div>
        <h1 className={styles.title}>Hello, world!</h1>
        <Link to="/login">login</Link>
        <Link to="/private">private</Link>
        <button onClick={() => this.props.onFetchThings('yes!').then(() => console.log('yep it\'s a promise'))}>
          Fetched things: {this.props.things}
        </button>
        {this.props.route && this.props.route.auth.loggedIn() && (
          <button onClick={this.logout.bind(this)}>Logout</button>
        )}
        {children}
      </div>
    );
  }

  logout() {
    // destroys the session data
    this.props.route.auth.logout();
    // redirects to login page
    this.props.changePage('/login');
  }
}
