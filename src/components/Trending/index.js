import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import TrendingVideo from '../TrendingVideo'
import SideBar from '../SideBar'
import './index.css'

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: ''}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channel: this.getChannel(each.channel),
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))
      this.setState({trendingVideos: updatedVideos, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  getChannel = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

  render() {
    const {apiStatus, trendingVideos} = this.state
    return (
      <>
        <Header />
        <div className="home-cart-container">
          <SideBar />

          {apiStatus === 'SUCCESS' && (
            <div data-testid="trending">
              <div className="trending">
                <div className="trending-logo">
                  <HiFire size={40} />
                </div>
                <h1>Trending</h1>
              </div>
              <ul className="ul">
                {trendingVideos.map(each => (
                  <TrendingVideo key={each.id} video={each} />
                ))}
              </ul>
            </div>
          )}
          {apiStatus === 'INITIAL' && (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
                We are having some trouble to complete your request. Please try
                again.
              </p>
              <button onClick={this.getTrendingVideos} type="button">
                Retry
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Trending
