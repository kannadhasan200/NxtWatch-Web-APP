import {Component} from 'react'
import {FaGamepad} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingVideo from '../GamingVideo'

import './index.css'

class Gaming extends Component {
  state = {gamingVideo: [], apiStatus: ''}

  componentDidMount() {
    this.getGamingContent()
  }

  getGamingContent = async () => {
    this.setState({apiStatus: 'INITIAL'})
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {videos} = data
      const updatedVideos = videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({gamingVideo: updatedVideos, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  render() {
    const {apiStatus, gamingVideo} = this.state
    return (
      <>
        <Header />
        <div className="home-cart-container">
          <SideBar />
          <div data-testid="gaming">
            <div className="trending">
              <div className="trending-logo">
                <FaGamepad size={40} />
              </div>
              <h1>Gaming</h1>
            </div>
            {apiStatus === 'SUCCESS' && (
              <ul className="ul-gaming">
                {gamingVideo.map(each => (
                  <GamingVideo key={each.id} video={each} />
                ))}
              </ul>
            )}
            {apiStatus === 'INITIAL' && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            {apiStatus === 'FAIL' && (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                  alt="failure view"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>
                  We are having some trouble to complete your request. Please
                  try again.
                </p>
                <button onClick={this.getGamingContent} type="button">
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
