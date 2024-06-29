import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    showPassword: false,
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg, showErrorMsg: true, username: '', password: ''})
    }
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  render() {
    const {
      username,
      password,
      showErrorMsg,
      errorMsg,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const type = showPassword ? 'text' : 'password'
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <Header />
        <div className="login-container">
          <div className="login-cart-container">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
            <form onSubmit={this.submitForm}>
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                onChange={this.getUsername}
                value={username}
                placeholder="Username"
                className="input"
                id="username"
                type="text"
              />
              <br />
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                onChange={this.getPassword}
                value={password}
                placeholder="Password"
                className="input"
                id="password"
                type={type}
              />
              <br />
              <input onChange={this.showPassword} id="check" type="checkbox" />
              <label htmlFor="check">Show Password</label>
              <br />
              <button className="login-button" type="submit">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
