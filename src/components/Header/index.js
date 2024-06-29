import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
      </Link>
      <div className="header-cart-container">
        <button type="button" data-testid="theme">
          <FaMoon size={25} className="light-dart-mode">
            1
          </FaMoon>
        </button>
        <img
          className="profile"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />
        <Popup
          modal
          trigger={
            <button className="logout-button" type="button">
              Logout
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="popup-content">
              <p>Are you sure, you want to logout</p>
              <button onClick={() => close()} type="button">
                Cancel
              </button>
              <button onClick={logOut} type="button">
                Confirm
              </button>
            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}

export default withRouter(Header)
