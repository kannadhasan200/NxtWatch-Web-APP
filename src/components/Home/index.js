import {Component} from 'react'
import {MdClose} from 'react-icons/md'
import {IoSearch} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import Videos from '../Videos'

import './index.css'

class Home extends Component {
  state = {
    showBanner: true,
    searchInput: '',
    apiStatus: '',
    videos: [],
  }

  componentDidMount() {
    this.getWatchVideos()
  }

  getChannel = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

  getWatchVideos = async () => {
    this.setState({apiStatus: 'INITIAL'})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        channel: this.getChannel(each.channel),
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))

      this.setState({videos: updatedVideos, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  submitForm = event => {
    event.preventDefault()
    const {searchInput} = this.state
    this.setState({searchInput}, this.getWatchVideos)
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderHomePrimeBanner = () => (
    <div data-testid="banner" className="prime-banner">
      <div className="banner-button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="nxt watch logo"
        />
        <button
          data-testid="close"
          onClick={this.closeBanner}
          className="cross-button"
          type="button"
        >
          <MdClose size={25}>1</MdClose>
        </button>
      </div>
      <p className="prime-heading">
        Buy Nxt Watch Premium prepaid <br /> plan with UPI
      </p>
      <button className="get-button" type="button">
        GET IT NOW
      </button>
    </div>
  )

  renderSearchForm = () => {
    const {searchInput} = this.state
    return (
      <form className="home-form " onSubmit={this.submitForm}>
        <input
          className="input-search"
          type="search"
          value={searchInput}
          onChange={this.getSearchInput}
        />
        <button data-testid="searchButton" type="submit">
          <IoSearch size={25}>1</IoSearch>
        </button>
      </form>
    )
  }

  retry = () => {
    this.setState({searchInput: ''}, this.getWatchVideos)
  }

  render() {
    const {showBanner, apiStatus, videos} = this.state
    return (
      <div data-testid="home" className="home-container">
        <Header />
        <div className="home-cart-container">
          <SideBar />
          <div className="home-main-section-container">
            {showBanner && this.renderHomePrimeBanner()}

            {this.renderSearchForm()}

            {videos.length === 0 &&
              apiStatus !== 'INITIAL' &&
              apiStatus !== '' && (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                  />
                  <h1>No Search results found</h1>
                  <p>Try different key words or remove search filters</p>
                  <button onClick={this.retry} type="button">
                    Retry
                  </button>
                </div>
              )}

            {apiStatus === 'SUCCESS' && (
              <ul className="render-video-ul-container">
                {videos.map(each => (
                  <Videos key={each.id} video={each} />
                ))}
              </ul>
            )}
            {apiStatus === 'INITIAL' && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color=" #3b82f6"
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
                <button onClick={this.getWatchVideos} type="button">
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
