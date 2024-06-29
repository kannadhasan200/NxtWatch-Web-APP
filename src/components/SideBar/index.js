import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {FaGamepad} from 'react-icons/fa'

import {CgPlayListAdd} from 'react-icons/cg'
import './index.css'

class SideBar extends Component {
  state = {activeButton: ''}

  changeActiveButton = id => {
    this.setState({activeButton: id})
  }

  render() {
    return (
      <div className="side-bar-container">
        <ul className="side-bar-ul-container">
          <li>
            <Link className="link" to="/">
              <button className="side-bar-button " type="button">
                <MdHome size={25} className="logo-side-bar" />
                <p>Home</p>
              </button>
            </Link>
          </li>

          <li>
            <Link className="link" to="/trending">
              <button className="side-bar-button " type="button">
                <HiFire size={25} className="logo-side-bar" />
                <p>Trending</p>
              </button>
            </Link>
          </li>
          <li>
            <Link className="link" to="/gaming">
              <button className="side-bar-button " type="button">
                <FaGamepad size={25} className="logo-side-bar" />
                <p>Gaming</p>
              </button>
            </Link>
          </li>
          <li>
            <Link className="link" to="/saved-videos">
              <button className="side-bar-button " type="button">
                <CgPlayListAdd size={25} className="logo-side-bar" />
                <p>Saved videos</p>
              </button>
            </Link>
          </li>
        </ul>
        <div className="contact-container">
          <p>CONTACT US</p>
          <img
            className="image-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
            alt="facebook logo"
          />
          <img
            className="image-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
            alt="twitter logo"
          />
          <img
            className="image-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
            alt="linked in logo"
          />
          <p>Enjoy! Now to see your channels and recommendations!</p>
        </div>
      </div>
    )
  }
}

export default SideBar
