import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

class RenderVideo extends Component {
  state = {videoDetails: {}, channel: {}, apiStatus: ''}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: 'INITIAL'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const videoDetails = data.video_details

      const updatedVideosDetails = {
        channel: this.getChannel(videoDetails.channel),
        id: videoDetails.id,
        description: videoDetails.description,
        videoUrl: videoDetails.video_url,
        title: videoDetails.title,
        thumbnailUrl: videoDetails.thumbnail_url,
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
      }

      this.setState({
        videoDetails: updatedVideosDetails,
        channel: updatedVideosDetails.channel,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  getDuration = time => {
    const date = new Date(time)
    const value = `${date.getFullYear()},${
      date.getMonth() + 1
    },${date.getDate()}`

    return formatDistanceToNow(new Date(value))
  }

  getChannel = channel => ({
    name: channel.name,
    subscriberCount: channel.subscriber_count,
    profileImageUrl: channel.profile_image_url,
  })

  render() {
    const {videoDetails, channel, apiStatus} = this.state

    const {videoUrl, title, description, publishedAt, viewCount} = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel

    return (
      <>
        <Header />
        <div className="video-details-container">
          <SideBar />
          {apiStatus === 'SUCCESS' && (
            <div className="react-player">
              <ReactPlayer controls url={videoUrl} height={550} width={1000} />
              <div>
                <p>{title}</p>
                <p>
                  {viewCount} views . {publishedAt}
                </p>
                <div>
                  <button className="like-button" type="button">
                    Like
                  </button>
                  <button className="like-button" type="button">
                    Dislike
                  </button>
                </div>
              </div>
              <hr />
              <div>
                <img src={profileImageUrl} alt="channel logo" />
                <div>
                  <p>{name}</p>
                  <p>{subscriberCount} subscribers</p>
                </div>
                <p>{description}</p>
              </div>
            </div>
          )}
          {apiStatus === 'INITIAL' && (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
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
              <button onClick={this.getVideoDetails} type="button">
                Retry
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default RenderVideo
