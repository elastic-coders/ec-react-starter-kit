import Auth0Lock from 'auth0-lock'
import decode from 'jwt-decode'

// https://github.com/auth0/lock
export default class AuthService {
  constructor(clientId, domain, storage, redirectUrl, history) {
    this.storage = storage || localStorage;
    this.history = history;
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        responseType: 'token',
        redirectUrl: redirectUrl || '',
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)
    // Redirect to desired page
    if (authResult.state && this.history) {
      this.history.replace(authResult.state);
    }
  }

  login(returnUrl) {
    // Call the show method to display the widget.
    this.lock.show({
      auth: {
        params: {
          state: returnUrl
        }
      }
    })

    return new Promise((resolve, reject) => {
      // If successful, the authenticator will redirect the page
      this.lock.on('hide', reject);
      this.lock.on('unrecoverable_error', reject);
      this.lock.on('authorization_error', reject);
    });
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !this.isTokenExpired()
  }

  setToken(idToken){
    // Saves user token to localStorage
    this.storage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return this.storage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    this.storage.removeItem('id_token');
  }

  getTokenExpirationDate(){
    const token = this.getToken();
    if (!token) {
      return null
    }
    const decoded = decode(token)
    if(!decoded.exp) {
      return null
    }

    const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp)
    return date
  }

  isTokenExpired(){
    const token = this.getToken();
    if (!token) {
      return false
    }
    const date = this.getTokenExpirationDate()
    const offsetSeconds = 0
    if (date === null) {
      return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }
}
